const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
const path = require('path');

contextBridge.exposeInMainWorld('electron', {
  homeDir: () => os.homedir(),
  osVersion: () => os.arch(),
});


contextBridge.exposeInMainWorld('tailwindPath', path.join(__dirname, 'app', 'build', 'tailwind.css'));


contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
});
