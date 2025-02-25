const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

let mainWindow;
let partidosWindow;

const createMainWindow = () => {
  if (partidosWindow) {
    partidosWindow.close(); 
  }
  if (mainWindow) return; 

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'clasificacion.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const createPartidosWindow = () => {
  if (mainWindow) {
    mainWindow.close();
  }
  if (partidosWindow) return; 

  partidosWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  partidosWindow.loadFile(path.join(__dirname, 'partidos.html'));

  partidosWindow.on('closed', () => {
    partidosWindow = null;
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

// Evento para cambiar de ventana
ipcMain.on('abrir-partidos', () => {
  createPartidosWindow();
});

ipcMain.on('abrir-clasificacion', () => {
  createMainWindow();
});

// Cerrar la aplicación cuando todas las ventanas estén cerradas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
