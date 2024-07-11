const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
const path = require('path');


contextBridge.exposeInMainWorld('electron', {
  homeDir: () => os.homedir(),
  osVersion: () => os.arch(),
  addItem: () => ipcRenderer.send('add-item'),
  addItemData: (data) => ipcRenderer.send('add-item-data', data),
  getItemData: (func) => ipcRenderer.on('add-item-data', (event, data) => func(data)),

  // BILLING  
  addBillingItem: () => ipcRenderer.send('add-billing-item'),
  addBillingItemData: (data) => ipcRenderer.send('add-billing-item-data', data),
  getBillingItemData: (func) => ipcRenderer.on('add-billing-item-data', (event, data) => func(data)),

  openBillingWindow: (data) => ipcRenderer.send('open-billing', data),

  // MARKET
  openMarketWindow: () => ipcRenderer.send('open-market'),
  openEditMarketWindow: (data) => ipcRenderer.send('open-edit-market', data),
  getEditMarketData: (callback) => ipcRenderer.on('edit-market-data', (event, data) => callback(data)),
  // getEditMarketData: (data) => ipcRenderer.send('edit-market-data', data),

  // PURCHASE
  openPurchasesWindow: (data) => ipcRenderer.send('open-purchases', data),

  // SALES
  openSalesWindow: () => ipcRenderer.send('open-sales'),

  // STOCK
  openStockWindow: () => ipcRenderer.send('open-stock'),
  openEditStockWindow: (data) => ipcRenderer.send('open-edit-stock', data),
  getEditStockData: (callback) => ipcRenderer.on('edit-stock-data', (event, data) => callback(data)),

  // Payment Oversight
  openAddPaymentOversightWindow: () => ipcRenderer.send('open-payops'),
  openAddPaymentTrackerWindow: (data) => ipcRenderer.send('open-paytracker', data),
  getPaymentTrackerData: (callback) => ipcRenderer.on('paytracker-data', (event, data) => callback(data)),

  // AUTH WINDOW
  openAuthWindow: () => ipcRenderer.send('open-auth'),
  
  // DIALOG BOX
  showDialog: () => ipcRenderer.send('show-dialog'),

  // BARCODE WINDOW
  openBarcodeWindow: (data) => ipcRenderer.send('open-barcode', data),
  getBarcodeData: (callback) => ipcRenderer.on('barcode-data', (event, data) => callback(data)),
});

contextBridge.exposeInMainWorld('tailwindPath', path.join(__dirname, 'app', 'build', 'tailwind.css'));

contextBridge.exposeInMainWorld('app', {
  print: (data) => ipcRenderer.send('print', data),
  printBarcode: (dataUrl) => ipcRenderer.send('print-barcode', dataUrl),
  onPrintResponse: (callback) => ipcRenderer.on('print-response', callback),
});

contextBridge.exposeInMainWorld('auth', {
  login: (data) => ipcRenderer.send('authenticated', data),
  logout: () => ipcRenderer.send('logout'),
  onLogin: (func) => ipcRenderer.on('login', (event, data) => func(data)),
  onLogout: (func) => ipcRenderer.on('logout', (event, data) => func(data)),
  getAuthType: (callback) => ipcRenderer.on('auth-type', (event, data) => callback(data)),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
});

contextBridge.exposeInMainWorld('reloader', {
  mainReload: () => ipcRenderer.send('reload-main'),
  getMainReload: (callback) => ipcRenderer.on('reload-main', (event, data) => callback(data)),
  addItemReload: () => ipcRenderer.send('reload-add-item'),
  billingReload: () => ipcRenderer.send('reload-billing'),
  marketReload: () => ipcRenderer.send('reload-market'),
  editMarketReload: () => ipcRenderer.send('reload-edit-market'),
  purchasesReload: () => ipcRenderer.send('reload-purchases'),
  salesReload: () => ipcRenderer.send('reload-sales'),
  stockReload: () => ipcRenderer.send('reload-stock'),
  editStockReload: () => ipcRenderer.send('reload-edit-stock'),
  payOpsReload: () => ipcRenderer.send('reload-payops'),
  payTrackerReload: () => ipcRenderer.send('reload-paytracker'),
  authReload: () => ipcRenderer.send('reload-auth'),
  barcodeReload: () => ipcRenderer.send('reload-barcode'),
});

contextBridge.exposeInMainWorld('api', {
  query: (sql, params) => ipcRenderer.send('query', sql, params),
  onQueryReply: (func) => ipcRenderer.on('query-reply', (event, data) => func(data)),
  onQueryError: (func) => ipcRenderer.on('query-error', (event, data) => func(data)),
});

contextBridge.exposeInMainWorld('qz', {
  connect: () => ipcRenderer.invoke('qz-connect'),
  findPrinters: () => ipcRenderer.invoke('qz-find-printers'),
  print: (config, data) => ipcRenderer.invoke('qz-print', config, data),
});