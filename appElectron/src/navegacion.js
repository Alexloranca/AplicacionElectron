const { ipcRenderer } = require('electron');

    document.getElementById('btn-clasificacion').addEventListener('click', () => {
        ipcRenderer.send('abrir-clasificacion');
    });

    document.getElementById('btn-partidos').addEventListener('click', () => {
        ipcRenderer.send('abrir-partidos');
    });