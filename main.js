var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.
var fs = require('fs');
require('shelljs/global');
var tmp = tempdir();

// Report crashes to our server.
require('crash-reporter').start();
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
  fs.unlink(tmp+'Biscuit/curframe.biscuit', f);
  fs.unlink(tmp+'Biscuit/pbarr.biscuit', f);
  fs.unlink(tmp+'Biscuit/framearr.biscuit', f);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    title: 'Biscuit',
    icon: __dirname + '/biscuit.png',
  });
  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    framearr = '';
    mainWindow = null;
  });
});
