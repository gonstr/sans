import { app, Menu } from 'electron'
import _ from 'lodash'

import window from './window'
import menus from './menus'
import files from './files'

files.init()

app.on('ready', () => {
  window.create()
  Menu.setApplicationMenu(Menu.buildFromTemplate(menus))
})

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (!window.count) window.create()
})
