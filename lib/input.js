const util = require('util')
const exec = util.promisify(require('child_process').exec)

const { events, emitter } = require('./events')

const inputWrapper = document.getElementById('input-wrapper')
const input = document.getElementById('input')
const body = document.getElementsByTagName('body')[0]

const keysDown = {}

input.addEventListener('keydown', async ({ key }) => {
  if (key === 'Enter') {
    emitter.emit(events.input, input.value)
    input.value = ''
  } else if (key === 'Tab') {
    input.value = await autoComplete(input.value)
    input.focus()
  }
})

body.addEventListener('keydown', event => {
  emitter.emit(events.keyDown, event)
  input.focus()
})

emitter.on(events.proc, () => (inputWrapper.style.visibility = 'hidden'))
emitter.on(events.close, () => {
  inputWrapper.style.visibility = 'visible'
  input.focus()
})

async function autoComplete(input) {
  const inputParts = input.split(' ').reverse()
  if (inputParts[0]) {
    const ls = await exec('ls -F')
    const results = ls.split('\n')
    const hits = results.filter(res => res.startsWith(inputParts[0]))
    if (hits.length === 1) {
      const hit = hits[0]
      inputParts[0] = hit.endsWith('/') ? hit : hit + ' '
      return inputParts.reverse().join(' ')
    } else if (hits.length > 1) {
      emitter.emit('stdout', hits.join('\t'))
    }
  }
  return input
}
