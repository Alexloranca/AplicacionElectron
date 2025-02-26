window.onload = async () => {
    const rutaPartidos = "http://localhost:3000/api/partidos";
    const axios = require("axios");
    const { DataFrame } = require('data-forge');

    async function getPartidos() {
        try {
            const response = await axios.get(rutaPartidos);
            const partidos = response.data.partidos;

            const df = new DataFrame(partidos);
            mostrarPartidos(partidos);
            mostrarAnalisis(df);

        } catch (error) {
            console.error("Error al obtener los partidos:", error);
        }
    }

    function mostrarPartidos(data) {
        const tabla = document.getElementById("tabla-partidos");
        tabla.innerHTML = ""; 

        data.forEach((partido) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${partido.numPartido}</td>
                <td>${partido.ronda}</td>
                <td>${partido.fecha}</td>
                <td>${partido.estadio}</td>
                <td>${partido.partido.local}</td>
                <td>${partido.partido.visitante}</td>
                <td>${partido.partido.resultado}</td>
            `;
            tabla.appendChild(row);
        });
    }

    function mostrarAnalisis(df) {
        const equiposLocales = df.getSeries("partido").select(p => p.local).distinct();
        const equiposVisitantes = df.getSeries("partido").select(p => p.visitante).distinct();
        const totalEquipos = equiposLocales.concat(equiposVisitantes).distinct().count();

        const totalPartidos = df.count();
        const mediaPartidosPorEquipo = totalPartidos / totalEquipos;

        // Hora a la que se juega mas partidos
        const horasFrecuentes = df.getSeries("fecha")
            .select(fecha => fecha.split("T")[1].substring(0, 2))
            .groupBy(h => h)
            .select(group => ({ hora: group.first(), count: group.count() }))
            .orderByDescending(g => g.count);

        const horaMasFrecuente = horasFrecuentes.any() ? horasFrecuentes.first().hora : "N/A";

        //Partido con mas goles
        const mayorResultado = df.getSeries("partido")
            .orderByDescending(p => {
                const [golesLocal, golesVisitante] = p.resultado.split(" - ").map(Number);
                return golesLocal + golesVisitante;
            })
            .first();

        const analisisDiv = document.getElementById("analisis");
        analisisDiv.innerHTML = `
            <p><b>Total de equipos:</b> ${totalEquipos}</p>
            <p><b>Media de partidos jugados por equipo:</b> ${mediaPartidosPorEquipo.toFixed(2)}</p>
            <p><b>Hora más frecuente de juego:</b> ${horaMasFrecuente}:00 UTC</p>
            <p><b>Mayor resultado registrado:</b> ${mayorResultado.local} ${mayorResultado.resultado} ${mayorResultado.visitante}</p>
        `;
    }

    // Llamar a la función cuando cargue la ventana
    getPartidos();
};
