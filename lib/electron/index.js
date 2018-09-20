import 'babel-polyfill'
import { app, Menu } from 'electron'
import _ from 'lodash'

import window from './window'
import menus from './menus'
import files from './files'
import ipc from './shell-ipc'

const init = Promise.all([ipc.init(), files.init()])

app.on('ready', async () => {
  await init
  window.create()
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus))
})

app.on('will-quit', () => ipc.cleanup())

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!window.windows.length) window.create()
})
