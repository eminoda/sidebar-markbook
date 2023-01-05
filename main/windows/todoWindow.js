const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

const createWindow = () => {};
module.exports = {
  open: () => {
    const todoWin = BrowserWindow.getAllWindows().find((win) => win.getTitle() == 'todo');
    if (todoWin) {
      todoWin.focus();
    } else {
      const rect = {
        width: 360,
        height: 440,
      };
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
      const win = new BrowserWindow({
        width: rect.width,
        height: rect.height,
        frame: false,
        show: false,
        transparent: true,
        x: parseInt(screenWidth / 2 - rect.width / 2),
        y: parseInt((screenHeight - rect.height) / 2),
        movable: true,
        webPreferences: {
          preload: path.join(__dirname, '../preload.js'),
          devTools: true,
        },
      });
      win.loadURL('http://127.0.0.1:5173/todo');
      win.once('ready-to-show', () => {
        win.setTitle('todo');
        win.show();
      });
    }
  },
};
