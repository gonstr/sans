import os from 'os'
import { spawn } from 'node-pty'
import locale from 'os-locale'
import EventEmitter from 'events'
import fs from 'fs'
import path from 'path'

import * as childprocs from './childprocs'
import { name, version } from '../../package'

export function create(cwd = os.homedir()) {
  // node-pty init
  const env = Object.assign(
    {
      LANG: locale.sync() + '.UTF-8'
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

  const pty = spawn('bash', ['--login'], {
    name: 'xterm-color',
    cols: 100,
    rows: 40,
    cwd,
    env
  })

  const emitter = new EventEmitter()

  const ses = {
    pty,
    pid: pty.pid,
    foreground: { pid: pty.pid, cmd: pty.process },
    cwd,
    on: (type, cb) => emitter.on(type, cb)
  }

  const dir = path.join(os.homedir(), `.sans/sessions/${pty.pid}`)
  const readFile = file => {
    fs.readFile(path.join(dir, file), (err, data) => {
      if (err) throw err
      ses[file] = data.toString()
      emitter.emit(file, data.toString())
    })
  }

  setTimeout(() => {
    readFile('pwd')
    readFile('branch')
    const watcher = fs.watch(dir, (type, file) => readFile(file))
    pty.on('exit', () => watcher.close())
  }, 200)

  return ses
}
