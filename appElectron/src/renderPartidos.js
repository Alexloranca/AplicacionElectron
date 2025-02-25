window.onload = async () => {
    const rutaPartidos = "http://localhost:3000/api/partidos";
    const axios = require("axios");

    async function getPartidos() {
        try {
            const response = await axios.get(rutaPartidos);
            mostrarPartidos(response.data.partidos);
        } catch (error) {
            console.error("Error al obtener los partidos:", error);
        }
    }

    function mostrarPartidos(data) {
        const tabla = document.getElementById("tabla-partidos");
        tabla.innerHTML = ""; // Limpiar antes de insertar nuevos datos

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

    // Llamar a la función cuando cargue la ventana
    getPartidos();
};
