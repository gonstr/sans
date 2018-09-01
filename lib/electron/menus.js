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
          focusedWindow.webContents.send(item.label)
        }
      },
      {
        label: 'New Window',
        accelerator: 'CmdOrCtrl+N',
        click() {
          window.create()
        }
      },
      {
        label: 'Close Shell',
        accelerator: 'CmdOrCtrl+W',
        click(item, focusedWindow) {
          focusedWindow.webContents.send(item.label)
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
          focusedWindow.webContents.send(item.label)
        }
      },
      { type: 'separator' },
      {
        label: 'Find...',
        accelerator: 'Cmd+F',
        click(item, focusedWindow) {
          focusedWindow.webContents.send(item.label)
        }
      },
      {
        label: 'Find Next',
        accelerator: 'Cmd+G',
        click(item, focusedWindow) {
          focusedWindow.webContents.send(item.label)
        }
      },
      {
        label: 'Find Previous',
        accelerator: 'Cmd+Shift+G',
        click(item, focusedWindow) {
          focusedWindow.webContents.send(item.label)
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
          focusedWindow.webContents.send(item.label)
        }
      },
      {
        label: 'Zoom In',
        accelerator: 'Cmd+Plus',
        click(item, focusedWindow) {
          focusedWindow.webContents.send(item.label)
        }
      },
      {
        label: 'Zoom Out',
        accelerator: 'Cmd+-',
        click(item, focusedWindow) {
          focusedWindow.webContents.send(item.label)
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
      accelerator: 'CmdOrCtrl+Shift+O',
      click(item, focusedWindow) {
        focusedWindow.webContents.send(item.label)
      }
    },
    {
      label: 'Show Next Tab',
      accelerator: 'CmdOrCtrl+Shift+P',
      click(item, focusedWindow) {
        focusedWindow.webContents.send(item.label)
      }
    },
    { type: 'separator' },
    { role: 'front' }
  ]
}

export default template
