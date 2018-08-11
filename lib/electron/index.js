import { app, Menu, BrowserWindow } from 'electron'

// Keep a global reference of the window object, so it dos not got GCd
let win

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    titleBarStyle: 'hiddenInset',
    show: false
  })
  win.once('ready-to-show', () => win.show())
  win.loadFile('lib/electron/index.html')
  win.on('closed', () => (win = null))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) createWindow()
})

const template = [
  {
    label: 'Sans',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    role: 'window'
  },
  {
    label: 'Help',
    role: 'help'
  }
]

const menu = Menu.buildFromTemplate(template)
//Menu.setApplicationMenu(menu)
