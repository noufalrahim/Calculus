const { app, BrowserWindow, Menu, ipcMain, globalShortcut, dialog } = require('electron');
const url = require('url');
const path = require('path');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Calculus.db');
const ThermalPrinter = require("node-thermal-printer").printer;
const Types = require("node-thermal-printer").types;


const {PosPrinter} = require('electron-pos-printer');

// import { app, BrowserWindow, Menu, ipcMain, globalShortcut, dialog } from 'electron';
// import url from 'url';
// import path from 'path';
// import sqlite3 from 'sqlite3';
// import ThermalPrinter from 'node-thermal-printer';
// import { PosPrinter } from 'electron-pos-printer';
// import { Types } from 'node-thermal-printer';

var db = new sqlite3.Database('Calculus.db');

let mainWindow;
let authWindow;
let addItemWindow;
let billingItemWindow;
let marketWindow;
let editMarketWindow;
let purchaseWindow;
let salesWindow;
let stockWindow;
let editStockWindow;
let addPayOpsWindow;
let paymentTrackerWindow;
let barcodeWindow;
const production = false;

function createMainWindow(data) {
  console.log("Data.....",data);
  console.log(__dirname + 'assets/icons/png/64x64.png');
  mainWindow = new BrowserWindow({
    title: 'Calculus',
    width: 1500,
    height: 800,
    icon: path.join(__dirname, 'assets/icons/favicon.ico'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html'),
    protocol: 'file',
  });

  if (production) {
    mainWindow.loadURL(startUrl);
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }

  globalShortcut.register('CommandOrControl+Shift+C', () => {
    mainWindow.webContents.toggleDevTools();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      mainWindow.webContents.send('auth-type', data);
    }, 1000);
  });
}
function createAddItemWindow() {
  addItemWindow = new BrowserWindow({
    title: 'Add New Item',
    width: 400,
    height: 300,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // addItemWindow.webContents.openDevTools();

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/AddItem'),
    protocol: 'file',
  });

  if (production) {
    addItemWindow.loadURL(startUrl);
  } else {
    addItemWindow.loadURL('http://localhost:3000/AddItem');
  }
  globalShortcut.register('CommandOrControl+Shift+C', () => {
    addItemWindow.webContents.toggleDevTools();
  });

}
function createBillingItemWindow(data) {
  billingItemWindow = new BrowserWindow({
    title: "Add New Item",
    width: 1000,
    height: 700,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, "./app/.next/server/pages/index.html/Bill/Add"),
    protocol: "file",
  });

  if (production) {
    billingItemWindow.loadURL(startUrl);
  } else {
    billingItemWindow.loadURL('http://localhost:3000/Bill/Add');
  }

  globalShortcut.register('CommandOrControl+Shift+B', () => {
    billingItemWindow.webContents.toggleDevTools();
  });

  billingItemWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      billingItemWindow.webContents.send('auth-type', data);
    }, 1000);
  });

}
function createMarketWindow() {
  marketWindow = new BrowserWindow({
    title: 'Market',
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/Enterprises/Add'),
    protocol: 'file',
  });

  if (production) {
    marketWindow.loadURL(startUrl);
  } else {
    marketWindow.loadURL('http://localhost:3000/Enterprises/Add');
  }

  globalShortcut.register('CommandOrControl+Shift+M', () => {
    marketWindow.webContents.toggleDevTools();
  });
}
function createEditMarketWindow(data) {
  console.log(data);
  editMarketWindow = new BrowserWindow({
    title: 'Purchases',
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/Enterprises/Edit'),
    protocol: 'file',
  });

  if (production) {
    editMarketWindow.loadURL(startUrl);
  } else {
    editMarketWindow.loadURL('http://localhost:3000/Enterprises/Edit');
  }

  globalShortcut.register('CommandOrControl+Shift+C', () => {
    editMarketWindow.webContents.toggleDevTools();
  });

  editMarketWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      editMarketWindow.webContents.send('edit-market-data', data);
    }, 1000);
  });
}
function createPurchaseWindow(data) {
  purchaseWindow = new BrowserWindow({
    title: 'Purchases',
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/Purchases/Add'),
    protocol: 'file',
  });

  if (production) {
    purchaseWindow.loadURL(startUrl);
  } else {
    purchaseWindow.loadURL('http://localhost:3000/Purchases/Add');
  }

  globalShortcut.register('CommandOrControl+Shift+C', () => {
    purchaseWindow.webContents.toggleDevTools();
  });

  purchaseWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      purchaseWindow.webContents.send('auth-type', data);
    }, 1000);
  });

}


function createSalesWindow() {
  salesWindow = new BrowserWindow({
    title: 'Sales',
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/Sales/Add'),
    protocol: 'file',
  });

  if (production) {
    salesWindow.loadURL(startUrl);
  } else {
    salesWindow.loadURL('http://localhost:3000/Sales/Add');
  }
}
function createStockWindow() {
  stockWindow = new BrowserWindow({
    title: 'Stock',
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/Stocks/Add'),
    protocol: 'file',
  });

  if (production) {
    stockWindow.loadURL(startUrl);
  } else {
    stockWindow.loadURL('http://localhost:3000/Stocks/Add');
  }

  globalShortcut.register('CommandOrControl+Shift+S', () => {
    stockWindow.webContents.toggleDevTools();
  });
}
function createEditStockWindow(data){
  console.log(data);
  editStockWindow = new BrowserWindow({
    title: 'Edit Stock',
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/Stocks/Edit'),
    protocol: 'file',
  });

  if (production) {
    editStockWindow.loadURL(startUrl);
  } else {
    editStockWindow.loadURL('http://localhost:3000/Stocks/Edit');
  }

  globalShortcut.register('CommandOrControl+Shift+Q', () => {
    editStockWindow.webContents.toggleDevTools();
  });

  editStockWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      editStockWindow.webContents.send('edit-stock-data', data);
    }, 1000);
  });
}
function createAddPayOpsWindow() {
  addPayOpsWindow = new BrowserWindow({
    title: 'Add Payment Oversight',
    width: 1000,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/PaymentOversight/Add'),
    protocol: 'file',
  });

  if (production) {
    addPayOpsWindow.loadURL(startUrl);
  } else {
    addPayOpsWindow.loadURL('http://localhost:3000/PaymentOversight/Add');
  } 

  globalShortcut.register('CommandOrControl+Shift+P', () => {
    addPayOpsWindow.webContents.toggleDevTools();
  }
  );
}
function createPaymentTrackerWindow(data) {
  paymentTrackerWindow = new BrowserWindow({
    title: 'Payment Tracker',
    width: 900,
    height: 700,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/PaymentOversight/PaymentTracker/Add'),
    protocol: 'file',
  });

  if (production) {
    paymentTrackerWindow.loadURL(startUrl);
  }
  else {
    paymentTrackerWindow.loadURL('http://localhost:3000/PaymentOversight/PaymentTracker/Add');
  }

  globalShortcut.register('CommandOrControl+Shift+P', () => {
    paymentTrackerWindow.webContents.toggleDevTools();
  });

  paymentTrackerWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      paymentTrackerWindow.webContents.send('paytracker-data', data);
    }, 1000);
  });
}
function createAuthWindow() {
  authWindow = new BrowserWindow({
    title: 'Authentication',
    width: 400,
    height: 300,
    resizable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });


  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/Auth'),
    protocol: 'file',
  });

  if (production) {
    authWindow.loadURL(startUrl);
  } else {
    authWindow.loadURL('http://localhost:3000/Auth');
  }


  globalShortcut.register('CommandOrControl+Shift+A', () => {
    authWindow.webContents.toggleDevTools();
  });
}
function createBarcodeWindow(data) {
  barcodeWindow = new BrowserWindow({
    title: 'Barcode',
    width: 400,
    height: 300,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const startUrl = url.format({
    pathname: path.join(__dirname, './app/.next/server/pages/index.html/Barcode'),
    protocol: 'file',
  });

  if (production) {
    barcodeWindow.loadURL(startUrl);
  } else {
    barcodeWindow.loadURL('http://localhost:3000/Barcode');
  }

  globalShortcut.register('CommandOrControl+Shift+B', () => {
    barcodeWindow.webContents.toggleDevTools();
  });

  barcodeWindow.webContents.on('did-finish-load', () => {
    setTimeout(() => {
      barcodeWindow.webContents.send('barcode-data', data);
    }, 1000);
  });
}
let printer = new ThermalPrinter({
  type: Types.EPSON,  // change according to your printer type
  interface: 'usb'
});

app.on('ready', () => {
  let isAuthenticated = false;
  if (!isAuthenticated) {
    createAuthWindow();
  } else {
    createMainWindow({
      accountType: 'child',
    });
  }

  ipcMain.on('add-item', () => {
    createAddItemWindow();
  });


  ipcMain.on('add-item-data', (event, data) => {
    mainWindow.webContents.send('add-item-data', data);
  });

  // BILLING
  ipcMain.on('open-billing', (event, data) => {
    createBillingItemWindow(data);
  });

  ipcMain.on('open-purchases', (event, data) => {
    console.log("Opening Purchases");
    console.log(data);
    createPurchaseWindow(data);
  });

  // MARKET
  ipcMain.on('open-market', () => {
    createMarketWindow();
  });

  ipcMain.on('open-edit-market', (event, data) => {
    createEditMarketWindow(data);
  });

  // ipcMain.on('edit-market-data', (event, data) => {
  //   editMarketWindow.webContents.send('edit-market-data', data);
  // });

  
  
  
  // PURCHASE
  

  // SALES
  ipcMain.on('open-sales', () => {
    createSalesWindow();
  });

  // STOCK
  ipcMain.on('open-stock', () => {
    createStockWindow();
  });

  ipcMain.on('open-edit-stock', (event, data) => {
    createEditStockWindow(data);
  });

  // PAYMENT OVERSIGHT
  ipcMain.on('open-payops', () => {
    createAddPayOpsWindow();
  });

  ipcMain.on('open-paytracker', (event, data) => {
    createPaymentTrackerWindow(data);
  });


  // AUTH
  ipcMain.on('authenticated', (event, data) => {
    isAuthenticated = true;
    authWindow.close();
    createMainWindow(data);
  });

  // BARCODE

  ipcMain.on('open-barcode', (event, data) => {
    createBarcodeWindow(data);
  });

  // PRINT
  ipcMain.on('print', async (event, arg) => {
    console.log("PRINTING");
    const data = JSON.parse(arg);
    console.log(data);
    PosPrinter.print(data, {
      printerName: 'POS-80',
      margin: '10 10 10 10',
    copies: 1,
    timeOutPerLine: 100,
    pageSize: '80mm'
    }).then(() => {
      console.log('Printed');
    }).catch((error) => {
      console.log(error);
    });
  });

  //DATABASE
  ipcMain.on('query', (event, sql, params) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        event.reply('query-error', err.message);
      } else {
        event.reply('query-reply', rows);
      }
    });
  });

  //DIALOG BOX
  ipcMain.on('show-dialog', (event) => {
    dialog.showMessageBox({
      type: 'info',
      buttons: [''],
      title: 'My Dialog',
      message: 'This is an info dialog',
      detail: 'More details here.',
    });
  });

  //RELOADER
  ipcMain.on('reload-main', () => {
    console.log("Reloading Main");
    setTimeout(() => {
      mainWindow.webContents.send('reload-main');
    }, 100);
  });

  ipcMain.on('reload-add-item', () => {
    addItemWindow.reload();
  });

  ipcMain.on('reload-billing', () => {
    billingItemWindow.reload();
  });

  ipcMain.on('reload-market', () => {
    marketWindow.reload();
  });

  ipcMain.on('reload-edit-market', () => {
    editMarketWindow.reload();
  });

  ipcMain.on('reload-purchases', () => {
    console.log("Reloading Purchases");
    purchaseWindow.webContents.send('reload-purchases');
  });

  ipcMain.on('reload-sales', () => {
    salesWindow.reload();
  });

  ipcMain.on('reload-stock', () => {
    stockWindow.reload();
  });

  ipcMain.on('reload-edit-stock', () => {
    editStockWindow.reload();
  });

  ipcMain.on('reload-payops', () => {
    addPayOpsWindow.reload();
  });

  ipcMain.on('reload-paytracker', () => {
    paymentTrackerWindow.reload();
  });

  ipcMain.on('reload-auth', () => {
    authWindow.reload();
  });

  ipcMain.on('reload-barcode', () => {
    barcodeWindow.reload();
  });
  

});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();

  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});