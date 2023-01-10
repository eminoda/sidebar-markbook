const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
const fs = require('fs-extra')

const APP_PATH = app.getAppPath()
const TODO_DATA_DIR = path.join(APP_PATH, 'todo')
const TODO_DATA_FILE_PATH = path.join(TODO_DATA_DIR, 'list.json')

const createWindow = () => {}
module.exports = {
  fetchTodoList: function () {
    try {
      if (!fs.ensureDirSync(TODO_DATA_DIR)) {
        fs.mkdirpSync(TODO_DATA_DIR)
      }
      fs.ensureFileSync(TODO_DATA_FILE_PATH)
      const list = JSON.parse(fs.readFileSync(TODO_DATA_FILE_PATH).toString() || '[]')
      return list
    } catch (err) {
      throw new Error('文件读取失败：' + err.message)
    }
  },
  updateTodoItem: function (list) {
    fs.writeFileSync(TODO_DATA_FILE_PATH, JSON.stringify(list))
    return true
  },
  getTodoListById: function (id) {
    const list = JSON.parse(fs.readFileSync(TODO_DATA_FILE_PATH).toString() || '[]')
    return list.find((item) => item.id == id).details
  },
  open: () => {
    const todoWin = BrowserWindow.getAllWindows().find((win) => win.getTitle() == 'todo')
    if (todoWin) {
      todoWin.focus()
    } else {
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
        show: false,
        transparent: true,
        x: parseInt(screenWidth / 2 - rect.width / 2),
        y: parseInt((screenHeight - rect.height) / 2),
        movable: true,
        webPreferences: {
          preload: path.join(__dirname, '../preload.js'),
          devTools: true,
        },
      })
      win.loadURL('http://127.0.0.1:5173/todo')
      win.once('ready-to-show', () => {
        win.setTitle('todo')
        win.show()
      })
    }
  },
}
