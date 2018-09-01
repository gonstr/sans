import os from 'os'
import { spawn } from 'node-pty'
import locale from 'os-locale'
import EventEmitter from 'events'
import fs from 'fs'
import path from 'path'

import { name, version } from '../../package'

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
      TERM_PROGRAM_VERSION: version
    }
  )

  // https://github.com/zeit/hyper/issues/696
  delete env.GOOGLE_API_KEY

  delete env.NODE_ENV

  return spawn(env.SHELL || '/bin/bash', ['--login'], {
    name: 'xterm-color',
    cols: 100,
    rows: 40,
    cwd,
    env
  })
}

function createFiles(dir) {
  fs.mkdirSync(dir)
  fs.openSync(path.join(dir, 'pwd'), 'w')
  fs.openSync(path.join(dir, 'cmd'), 'w')
  fs.openSync(path.join(dir, 'git'), 'w')
}

export default class Session extends EventEmitter {
  constructor(cwd = os.homedir()) {
    super()
    this.pty = createPty(cwd.trim())

    const dir = path.join(os.homedir(), `.sans/sessions/${this.pty.pid}`)
    createFiles(dir)

    // Exec init scripts
    if (process.env.SHELL === '/bin/bash') {
      this.pty.write(`source ${path.join(os.homedir(), '.sans/bash-init.sh')} && clear\n`)
    } else if (process.env.SHELL === '/bin/zsh') {
      this.pty.write(`source ${path.join(os.homedir(), '.sans/zsh-init.sh')} && clear\n`)
    }

    const readFile = file => {
      // We delay reading the file to avoid flickering on fast commands
      setTimeout(() => {
        fs.readFile(path.join(dir, file), (err, data) => {
          if (err) throw err
          const str = data.toString()
          if (this[file] !== str) {
            this[file] = str
            this.emit(file, str)
          }
        })
      }, 50)
    }

    readFile('pwd')
    readFile('git')
    const watcher = fs.watch(dir, (type, file) => readFile(file))
    this.pty.on('exit', () => watcher.close())
  }

  close = () => this.pty.kill()
}
