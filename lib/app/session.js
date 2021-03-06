import { spawn } from 'node-pty'
import locale from 'os-locale'
import { remote, ipcRenderer } from 'electron'
import EventEmitter from 'events'
import fs from 'fs'
import path from 'path'
import os from 'os'
import Store from 'electron-store'

import { name, version } from '../../package'
const { fd } = remote.require(path.join(__dirname, '../electron/shell-ipc'))

const store = new Store()

function createPty(cwd) {
  const env = Object.assign(
    {
      LANG: locale.sync() + '.UTF-8',
      LC_CTYPE: 'UTF-8'
    },
    process.env,
    {
      TERM: 'xterm-256color',
      COLORTERM: 'truecolor',
      TERM_PROGRAM: name,
      TERM_PROGRAM_VERSION: version,
      SANS_IPC_FD: fd
    }
  )

  // https://github.com/zeit/hyper/issues/696
  delete env.GOOGLE_API_KEY

  delete env.NODE_ENV

  const shell = store.get('config:shell', '/bin/zsh')
  const pty = spawn(shell, ['--login'], {
    name: 'xterm-color',
    cols: 100,
    rows: 40,
    cwd,
    env
  })
  pty.shell = shell
  return pty
}

export default class Session extends EventEmitter {
  constructor(pwd = os.homedir()) {
    super()
    this.pwd = pwd
    this.pty = createPty(pwd.trim())

    ipcRenderer.on('shell_message', this.handleShellMessage)
  }

  handleShellMessage = (event, { pid, cmd, message }) => {
    if (pid === this.pty.pid) {
      this[cmd] = message
      this.emit(cmd, message)
    }
  }

  close = () => {
    ipcRenderer.removeListener('shell_message', this.handleShellMessage)
    this.pty.kill()
  }
}
