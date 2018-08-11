import os from 'os'
import { spawn } from 'node-pty'
import locale from 'os-locale'
import EventEmitter from 'events'

import * as childprocs from './childprocs'
import { name, version } from '../../package'

// Poll for fpid, cwd and git changes
async function poll(ses) {
  ses.polling = true

  ses.foreground = await childprocs.foreground(ses.pty.pid)
  ses.cwd = await childprocs.cwd(ses.pty.pid)
  ses.gitStatus = await childprocs.gitStatus(ses.cwd)

  ses.emitter.emit('poll')

  ses.pollsLeft -= 1
  if (ses.pollsLeft > 0) setTimeout(() => poll(ses), 200)
  else ses.polling = false
}

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
    emitter,
    pollsLeft: 0,
    polling: false
  }

  pty.on('exit', () => {
    ses.pollsLeft = 0
    ses.polling = false
  })

  pty.on('data', () => {
    ses.pollsLeft = 5
    if (!ses.polling) poll(ses)
  })

  return ses
}
