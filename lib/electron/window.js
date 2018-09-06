import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'
import _ from 'lodash'

// Keep a global reference of the window objects, so it dos not get GCd
const windows = []

function create() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 400,
    minHeight: 300,
    titleBarStyle: 'hiddenInset',
    center: true,
    show: false,
    webPreferences: {
      devTools: isDev
    }
  })
  windows.push(win)
  win.once('ready-to-show', () => win.show())
  win.loadFile('lib/electron/index.html')
  win.on('close', () => _.pull(windows, win))
  win.on('move', () => win.webContents.send('move'))
}

module.exports = {
  create,
  count: () => windows.length
}
