import os from 'os'
import { spawn } from 'node-pty'
import locale from 'os-locale'
import EventEmitter from 'events'
import fs from 'fs'
import path from 'path'

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

  // Exec init.sh and clear + clear it from history
  pty.write(
    `source ${path.join(
      os.homedir(),
      '.sans/init.sh'
    )} && clear && history -d $(history | tail -n 1 | awk '{print $1}')\n`
  )

  const emitter = new EventEmitter()

  const ses = {
    pty,
    pid: pty.pid,
    foreground: { pid: pty.pid, cmd: pty.process },
    cwd,
    on: (type, cb) => emitter.on(type, cb),
    close: () => pty.kill()
  }

  const dir = path.join(os.homedir(), `.sans/sessions/${pty.pid}`)
  fs.mkdirSync(dir)
  fs.openSync(path.join(dir, 'pwd'), 'w')
  fs.openSync(path.join(dir, 'cmd'), 'w')
  fs.openSync(path.join(dir, 'git'), 'w')

  const readFile = file => {
    // We delay reading the file to avoid flickering on fast commands
    setTimeout(() => {
      fs.readFile(path.join(dir, file), (err, data) => {
        if (err) throw err
        const str = data.toString()
        if (ses[file] !== str) {
          ses[file] = str
          emitter.emit(file, str)
        }
      })
    }, 50)
  }

  readFile('pwd')
  readFile('git')
  const watcher = fs.watch(dir, (type, file) => readFile(file))
  pty.on('exit', () => watcher.close())

  return ses
}
