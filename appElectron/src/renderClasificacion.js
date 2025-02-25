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

    // Llamar a la función cuando cargue la ventana
    getClasificacion();
};
