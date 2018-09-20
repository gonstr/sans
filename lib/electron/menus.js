import electron, { app } from 'electron'
import isDev from 'electron-is-dev'

import window from './window'

const template = [
  {
    label: 'Shell',
    submenu: [
      {
        label: 'New Tab',
        accelerator: 'CmdOrCtrl+T',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.send('new-tab')
          else window.create()
        }
      },
      {
        label: 'New Window',
        accelerator: 'CmdOrCtrl+N',
        click() {
          window.create()
        }
      },
      { type: 'separator' },
      {
        label: 'Split Horizontally',
        accelerator: 'CmdOrCtrl+Shift+D',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.send('spit-horizontally')
        }
      },
      {
        label: 'Split Vertically',
        accelerator: 'CmdOrCtrl+D',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.send('split-vertically')
        }
      },
      { type: 'separator' },
      {
        label: 'Close Shell',
        accelerator: 'CmdOrCtrl+W',
        click(item, focusedWindow) {
          focusedWindow && focusedWindow.webContents.send('close-shell')
        }
      }
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
      { role: 'selectall' },
      { type: 'separator' },
      {
        label: 'Clear',
        accelerator: 'Cmd+K',
        click(item, focusedWindow) {
          focusedWindow && focusedWindow.webContents.send('clear')
        }
      },
      { type: 'separator' },
      {
        label: 'Find...',
        accelerator: 'Cmd+F',
        click(item, focusedWindow) {
          focusedWindow && focusedWindow.webContents.send('find')
        }
      },
      {
        label: 'Find Next',
        accelerator: 'Cmd+G',
        click(item, focusedWindow) {
          focusedWindow && focusedWindow.webContents.send('find-next')
        }
      },
      {
        label: 'Find Previous',
        accelerator: 'Cmd+Shift+G',
        click(item, focusedWindow) {
          focusedWindow && focusedWindow.webContents.send('find-previous')
        }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Actual Size',
        accelerator: 'Cmd+0',
        click(item, focusedWindow) {
          focusedWindow && focusedWindow.webContents.send('actual-size')
        }
      },
      {
        label: 'Zoom In',
        accelerator: 'Cmd+Plus',
        click(item, focusedWindow) {
          focusedWindow && focusedWindow.webContents.send('zoom-in')
        }
      },
      {
        label: 'Zoom Out',
        accelerator: 'Cmd+-',
        click(item, focusedWindow) {
          focusedWindow && focusedWindow.webContents.send('zoom-out')
        }
      },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click() {
          electron.shell.openExternal('https://github.com/gonstr/sans')
        }
      }
    ]
  }
]

if (isDev) {
  template[2].submenu.unshift(
    { role: 'reload' },
    { role: 'forcereload' },
    { role: 'toggledevtools', accelerator: 'Alt+CmdOrCtrl+J' },
    { type: 'separator' }
  )
}

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services', submenu: [] },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })

  // Edit menu
  template[2].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [{ role: 'startspeaking' }, { role: 'stopspeaking' }]
    }
  )

  // Window menu
  template[4].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    {
      label: 'Show Previous Tab',
      accelerator: 'CmdOrCtrl+O',
      click(item, focusedWindow) {
        focusedWindow && focusedWindow.webContents.send('show-previous-tab')
      }
    },
    {
      label: 'Show Next Tab',
      accelerator: 'CmdOrCtrl+P',
      click(item, focusedWindow) {
        focusedWindow && focusedWindow.webContents.send('show-next-tab')
      }
    },
    { type: 'separator' },
    {
      label: 'Move Tab Backward',
      accelerator: 'CmdOrCtrl+Shift+O',
      click(item, focusedWindow) {
        focusedWindow && focusedWindow.webContents.send('move-tab-backward')
      }
    },
    {
      label: 'Move Tab Forward',
      accelerator: 'CmdOrCtrl+Shift+P',
      click(item, focusedWindow) {
        focusedWindow && focusedWindow.webContents.send('move-tab-forward')
      }
    },
    { type: 'separator' },
    { role: 'front' }
  ]
}

export default template
