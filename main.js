const { app, BrowserWindow,Menu } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Calculus',
    width: 1500,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.webContents.openDevTools();
  Menu.setApplicationMenu(null);

  const production = !true;

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html'),
    protocol: 'file',
  });

  if(production) {
    mainWindow.loadURL(startUrl);
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }
}

app.whenReady().then(createMainWindow);


