const { exec } = require('child_process')
const path = require('path')
const os = require('os')
const hljs = require('highlight.js')

const { events, emitter } = require('./events')

const main = document.getElementById('main')

hljs.configure({
  languages: ['json', 'javascript', 'html', 'css', 'markdown']
})

const hljsThreshhold = 20

emitter.on(events.stdout, output => render(output))
emitter.on(events.stderr, output => render(output, false, '#ff5555'))

function render(text, highlight = true, color) {
  const pre = document.createElement('pre')
  if (highlight) {
    const processed = hljs.highlightAuto(text)
    pre.innerHTML = processed.relevance > hljsThreshhold ? processed.value : text
  } else {
    pre.innerHTML = text
  }
  if (color) pre.style.color = color
  main.appendChild(pre)
  scrollBottom()
}

function scrollBottom() {
  main.scrollTop = main.scrollHeight
}
