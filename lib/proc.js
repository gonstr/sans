const { exec } = require('child_process')

const { events, emitter } = require('./events')

const shell = '/bin/sh'

const cdRegExp = /^cd (\S+)$/i

let proc

emitter.on(events.input, input => {
  if (!proc && input) {
    proc = exec(input, { shell })
    emitter.emit(events.proc, proc)
    proc.stdout.on('data', data => emitter.emit(events.stdout, data))
    proc.stderr.on('data', data => emitter.emit(events.stderr, data))
    proc.on('close', code => {
      // If the exit code is 0, and the command is cd, change process dir
      if (code === 0) {
        const cd = input.match(cdRegExp)
        if (cd) process.chdir(cd[1])
      }
      proc = null
      emitter.emit(events.close, code)
    })
  }
})

emitter.on(events.keyDown, ({ key, ctrlKey, metaKey }) => {
  if (proc && key === 'c' && (ctrlKey || metaKey)) proc.kill()
})
