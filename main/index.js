const { app, BrowserWindow, ipcMain } = require('electron');
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
    // win.setResizable(true)
    console.log(data.type);
    if (data.type == 'in') {
      win.setSize(rect.width + 300, rect.height);
    } else {
      win.setSize(rect.width, rect.height);
    }
    win.setResizable(false);
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
