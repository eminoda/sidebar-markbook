const { channel } = require('diagnostics_channel')
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const todoWindow = require('./windows/todoWindow')
const browerWindow = require('./windows/browerWindow')

function createWindow(screenHeight) {
  const rect = {
    width: 70,
    height: 600,
  }
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
  })

  // win.loadFile('index.html');
  win.loadURL('http://127.0.0.1:5173/')
  ipcMain.on('win-change', async (event, data) => {
    win.setResizable(true)
    const [width, height] = win.getSize()
    console.log('old win rect:', [width, height])
    if (data.width) {
      const newWidth = width + data.width
      win.setSize(newWidth, rect.height)
    }
    console.log('new win rect', win.getSize())
    win.setResizable(false)
  })
  ipcMain.handle('win-change', (event, data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      win.setResizable(true)
      const newWidth = data.width + rect.width
      win.setSize(newWidth, rect.height)
      const [width, height] = win.getSize()
      win.setResizable(false)
      resolve({ width, height })
    })
  })
  // invoke-event 事件监听
  ipcMain.handle('invoke-event', (event, data) => {
    const { eventName, ...args } = data
    console.log('请求事件', eventName)
    console.log('请求参数=>', args)
    return new Promise((resolve, reject) => {
      try {
        if (eventName == 'open-win-todo') {
          try {
            todoWindow.open()
            resolve(true)
          } catch (err) {
            reject(new Error('打开记事本失败: ' + err.message))
          }
        } else if (eventName == 'open-win-brower') {
          try {
            browerWindow.open()
            resolve(true)
          } catch (err) {
            reject(new Error('打开浏览器失败: ' + err.message))
          }
        } else if (eventName == 'getTodoList') {
          resolve(todoWindow.fetchTodoList())
        } else if (eventName == 'updateTodoList') {
          resolve(todoWindow.updateTodoItem(args.data))
        } else if (eventName == 'removeTodoById') {
          resolve(todoWindow.removeTodoById(args.data))
        } else if (eventName == 'getTodoEvents') {
          resolve(todoWindow.getTodoEvents(args.data))
        } else if (eventName == 'removeTodoEventById') {
          const { id, todoEvent } = args.data
          resolve(todoWindow.removeTodoEventById(id, todoEvent))
        } else if (eventName == 'createTodoEvent') {
          resolve(todoWindow.createTodoEvent())
        }
        // 更新待做事项
        else if (eventName == 'updateTodoEventsById') {
          const { id, todoEvents } = args.data
          resolve(todoWindow.updateTodoListById(id, todoEvents))
        } else {
          resolve({ test: 123 })
        }
      } catch (err) {
        console.log(err)
      }
    })
  })
}

app.whenReady().then(() => {
  const { screen } = require('electron')
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height: screenHeight } = primaryDisplay.workAreaSize
  createWindow(screenHeight)
  console.log('electron is working')

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
