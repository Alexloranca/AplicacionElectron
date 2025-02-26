window.onload = async () => {
    const rutaClasificacion = "http://localhost:3000/api/clasificacion";
    const axios = require("axios");
    const { DataFrame } = require('data-forge');

    async function getClasificacion() {
        try {
            const response = await axios.get(rutaClasificacion);
            const clasificacion = response.data.clasificacion;

            const df = new DataFrame(clasificacion);
            mostrarAnalisis(df);

            mostrarClasificacion(clasificacion);
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

    function mostrarAnalisis(df) {
        // Total de equipos
        const totalEquipos = df.count();
    
        // Total de partidos jugados
        const totalPartidos = df.getSeries("estadisticas")
            .select(est => est.PJ) // Extraer solo PJ
            .sum(); 

        // Promedio de puntos
        const puntosTotales = df.getSeries("puntos").sum();
        const promedioPuntos = puntosTotales / totalEquipos;
    
        // Media de partidos ganados (PG)
        const totalPG = df.getSeries("estadisticas")
            .select(est => est.PG) 
            .sum();  
    
        const mediaPG = totalPG / totalEquipos;
    
        // Mostrar análisis en el HTML
        const analisisDiv = document.getElementById("analisis");
        analisisDiv.innerHTML = `
            <p><b>Total de equipos:</b> ${totalEquipos}</p>
            <p><b>Total de partidos jugados:</b> ${totalPartidos}</p>
            <p><b>Promedio de puntos por equipo:</b> ${promedioPuntos.toFixed(2)}</p>
            <p><b>Media de partidos ganados por equipo:</b> ${mediaPG.toFixed(2)}</p>
        `;
    }
    
    
    getClasificacion();
};
