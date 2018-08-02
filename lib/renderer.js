const { exec } = require('child_process')
const path = require('path')
const os = require('os')
const hljs = require('highlight.js')

const { events, emitter } = require('./events')

const main = document.getElementById('main')
const output = document.getElementById('output')
const dir = document.getElementById('dir')

hljs.configure({
  languages: ['json', 'javascript', 'html', 'css', 'markdown']
})

const hljsThreshhold = 20

emitter.on(events.input, input => render(`${prompt()}&nbsp;${input}`, false, '#8be9fd'))
emitter.on(events.stdout, output => render(output))
emitter.on(events.stderr, output => render(output, false, '#ff5555'))
emitter.on(events.close, () => updateDir())
updateDir()

function render(text, highlight = true, color) {
  const pre = document.createElement('pre')
  if (highlight) {
    const processed = hljs.highlightAuto(text)
    pre.innerHTML = processed.relevance > hljsThreshhold ? processed.value : text
  } else {
    pre.innerHTML = text
  }
  if (color) pre.style.color = color
  output.appendChild(pre)
  scrollBottom()
}

function scrollBottom() {
  main.scrollTop = main.scrollHeight
}

function updateDir() {
  dir.innerHTML = `${prompt()}&nbsp;`
}

function prompt() {
  return `${
    process
      .cwd()
      .split('/')
      .reverse()[0]
  }$`
}
