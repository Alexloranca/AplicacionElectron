window.onload = async () => {
    const rutaClasificacion = "http://localhost:3000/api/clasificacion";
    const axios = require("axios");

    async function getClasificacion() {
        try {
            const response = await axios.get(rutaClasificacion);
            mostrarClasificacion(response.data.clasificacion);
        } catch (error) {
            console.error("Error al obtener la clasificación:", error);
        }
    }

    function mostrarClasificacion(data) {
        const tabla = document.getElementById("tabla-clasificacion");
        tabla.innerHTML = ""; 

        data.forEach((equipo) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${equipo.equipo}</td>
                <td>${equipo.puntos}</td>
                <td>${equipo.estadisticas.PJ}</td>
                <td>${equipo.estadisticas.PG}</td>
                <td>${equipo.estadisticas.PE}</td>
                <td>${equipo.estadisticas.PP}</td>
                <td>${equipo.estadisticas.GF}</td>
                <td>${equipo.estadisticas.GC}</td>
                <td>${equipo.estadisticas.DG}</td>
            `;
            tabla.appendChild(row);
        });
    }

    // Función para mostrar el análisis encima de la tabla usando `data-forge`
    function mostrarAnalisis(df) {
        // 1. Total de equipos
        const totalEquipos = df.count();

        // 2. Promedio de goles por equipo (usando la columna 'GF' para Goles a favor)
        const golesTotales = df
            .select(row => row.estadisticas.GF)
            .sum();
        const promedioGoles = golesTotales / totalEquipos;

        // 3. Total de partidos jugados (usando la columna 'PJ')
        const totalPartidos = df
            .select(row => row.estadisticas.PJ)
            .sum();

        // 4. Promedio de puntos por equipo
        const puntosTotales = df
            .select(row => row.puntos)
            .sum();
        const promedioPuntos = puntosTotales / totalEquipos;

        // Mostramos el análisis en el div correspondiente
        const analisisDiv = document.getElementById("analisis");
        analisisDiv.innerHTML = `
            <p>Total de equipos: ${totalEquipos}</p>
            <p>Promedio de goles por equipo: ${promedioGoles.toFixed(2)}</p>
            <p>Total de partidos jugados: ${totalPartidos}</p>
            <p>Promedio de puntos por equipo: ${promedioPuntos.toFixed(2)}</p>
        `;
    }

    // Llamar a la función cuando cargue la ventana
    getClasificacion();
};
