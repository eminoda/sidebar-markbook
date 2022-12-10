const { channel } = require('diagnostics_channel');
const { app, BrowserWindow, ipcMain } = require('electron');
const { resolve } = require('path');
const path = require('path');

function createWindow(screenHeight) {
  const rect = {
    width: 70,
    height: 600,
  };
  const win = new BrowserWindow({
    width: rect.width,
    height: rect.height,
    frame: false,
    x: 100,
    y: parseInt((screenHeight - rect.height) / 2),
    resizable: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
    },
  });

  // win.loadFile('index.html');
  win.loadURL('http://127.0.0.1:5173/');
  ipcMain.on('win-change', async (event, data) => {
    win.setResizable(true);
    const [width, height] = win.getSize();
    console.log('old win rect:', [width, height]);
    if (data.width) {
      const newWidth = width + data.width;
      win.setSize(newWidth, rect.height);
    }
    console.log('new win rect', win.getSize());
    win.setResizable(false);
  });
  ipcMain.handle('win-change', (event, data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
      win.setResizable(true);
      const newWidth = data.width + rect.width;
      win.setSize(newWidth, rect.height);
      const [width, height] = win.getSize();
      win.setResizable(false);
      resolve({ width, height });
    });
  });
}

app.whenReady().then(() => {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height: screenHeight } = primaryDisplay.workAreaSize;
  createWindow(screenHeight);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
