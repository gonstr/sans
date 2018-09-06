import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'
import _ from 'lodash'
import Store from 'electron-store'

const store = new Store()

// Keep a global reference of the window objects, so it dos not get GCd
const windows = []

function create() {
  const bounds = store.get('bounds', { width: 800, height: 600 })

  const win = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
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
  win.on('resize', () => {
    const [width, height] = win.getSize()
    store.set('bounds', { width, height })
  })
}

module.exports = {
  create,
  count: () => windows.length
}
