const { spawn } = require('child_process')

const { events, emitter } = require('./events')

const shell = spawn('/bin/bash', ['-i'])
shell.stdout.on('data', data => emitter.emit(events.stdout, data.toString('utf8')))
shell.stderr.on('data', data => emitter.emit(events.stderr, data.toString('utf8')))

emitter.on(events.input, input => shell.stdin.write(input))

// emitter.on(events.keyDown, ({ key, ctrlKey, metaKey }) => {
//   if (proc && key === 'c' && (ctrlKey || metaKey)) proc.kill()
// })
