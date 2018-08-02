const { exec } = require('child_process')
const path = require('path')
const os = require('os')
const hljs = require('highlight.js')

const body = document.getElementsByTagName('body')[0]
const main = document.getElementById('main')
const output = document.getElementById('output')
const dir = document.getElementById('dir')
const input = document.getElementById('input')

hljs.configure({
  languages: ['json', 'javascript']
})

let proc
let ctrlDown = false

updateDir()

function appendRow(text, highlight = true, color) {
  const pre = document.createElement('pre')
  pre.innerHTML = highlight ? hljs.highlightAuto(text).value : text
  if (color) pre.style.color = color
  output.appendChild(pre)
  main.scrollTop = main.scrollHeight
}

function updateDir() {
  dir.innerHTML = dirName() + '$&nbsp;'
}

function dirName() {
  return `${
    process
      .cwd()
      .split('/')
      .reverse()[0]
  }`
}

input.addEventListener('keydown', ({ key }) => {
  if (!proc && key === 'Enter') {
    const val = input.value
    input.value = ''

    if (val) {
      appendRow(dirName() + `$&nbsp;${val}`, false, '#8be9fd')
      const split = val.split(' ')
      if (split[0].toLowerCase() === 'cd') {
        process.chdir(split.slice(1).join(' '))
        updateDir()
      } else {
        input.style.visibility = 'hidden'
        proc = exec(val, { shell: '/bin/bash' })
        proc.stdout.on('data', data => appendRow(data.toString('utf8')))
        proc.stderr.on('data', data => appendRow(data.toString('utf8'), false, '#ff5555'))
        proc.on('close', () => {
          input.style.visibility = 'visible'
          input.focus()
          proc = null
        })
      }
    } else {
      appendRow(dirName() + `$&nbsp;${val}`, false, '#8be9fd')
    }
  }

  body.addEventListener('keydown', ({ key }) => {
    if (key === 'Control' || key === 'Meta') ctrlDown = true
    else if (proc && key === 'c') proc.kill()
  })

  body.addEventListener('keyup', ({ key }) => {
    if (key === 'Control' || key === 'Meta') ctrlDown = false
  })
})
