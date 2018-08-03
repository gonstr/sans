const EventEmitter = require('events')

const emitter = new EventEmitter()

const events = {
  input: 'input',
  proc: 'proc',
  close: 'close',
  stdout: 'stdout',
  stderr: 'stderr'
}

module.exports = {
  events,
  emitter
}
