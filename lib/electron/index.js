import { app, Menu, BrowserWindow } from 'electron'
import fs from 'fs'
import os from 'os'
import path from 'path'

import template from './menus'

const dir = path.join(os.homedir(), '.sans')
if (!fs.existsSync(dir)) fs.mkdirSync(dir)
fs.copyFileSync(path.join(__dirname, '../init.sh'), path.join(dir, 'init.sh'))
fs.copyFileSync(
  path.join(__dirname, '../../node_modules/bash-preexec/bash-preexec.sh'),
  path.join(dir, 'bash-preexec.sh')
)

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
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
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
