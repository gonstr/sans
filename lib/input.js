const { events, emitter } = require('./events')

const body = document.getElementsByTagName('body')[0]

body.addEventListener('keypress', ({ key }) => emitter.emit(events.input, key))
