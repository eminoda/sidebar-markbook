const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const moment = require('moment');
const APP_PATH = app.getAppPath();

const createWindow = () => {};
module.exports = {
  close: () => {
    const browerWin = BrowserWindow.getAllWindows().find((win) => win.getTitle() == 'brower');
    browerWin.close()
  },
  open: () => {
    const browerWin = BrowserWindow.getAllWindows().find((win) => win.getTitle() == 'brower');
    if (browerWin) {
      browerWin.focus();
    } else {
      const rect = {
        width: 1200,
        height: 720,
      };
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
      const win = new BrowserWindow({
        width: rect.width,
        height: rect.height,
        // frame: false,
        show: false,
        // transparent: true,
        x: parseInt(screenWidth / 2 - rect.width / 2),
        y: parseInt((screenHeight - rect.height) / 2),
        movable: true,
        webPreferences: {
          preload: path.join(__dirname, '../preload.js'),
          devTools: true,
        },
      });
      win.loadURL('http://127.0.0.1:5173/brower');
      win.once('ready-to-show', () => {
        win.setTitle('brower');
        win.show();
      });
    }
  },
};
