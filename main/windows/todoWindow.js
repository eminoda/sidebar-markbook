const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
module.exports = {
  open: () => {
    console.log(BrowserWindow.getAllWindows().map((win) => win.getTitle()))
    const rect = {
      width: 360,
      height: 440,
    }
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize
    const win = new BrowserWindow({
      width: rect.width,
      height: rect.height,
      frame: false,
      x: parseInt(screenWidth / 2 - rect.width / 2),
      y: parseInt((screenHeight - rect.height) / 2),
      // resizable: false,
      webPreferences: {
        preload: path.join(__dirname, '../preload.js'),
        devTools: true,
      },
    })
    win.loadURL('http://127.0.0.1:5173/todo')
    win.setTitle('todo')
    console.log(win.getTitle())
  },
}
