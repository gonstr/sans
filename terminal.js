const { exec } = require('child_process')

const body = document.getElementsByTagName('body')[0]
const main = document.getElementById('main')
const input = document.getElementById('input')

let proc
let ctrlDown = false

function appendRow(text = '&nbsp', color) {
  const pre = document.createElement('pre')
  pre.innerHTML = text
  if (color) pre.style.color = color
  main.appendChild(pre)
}

input.addEventListener('keydown', ({ key }) => {
  if (!proc && key === 'Enter') {
    const val = input.value
    input.value = ''

    if (val) {
      input.style.visibility = 'hidden'
      proc = exec(val)
      proc.stdout.on('data', data => appendRow(data))
      proc.stderr.on('data', data => appendRow(data, '#ff5555'))
      proc.on('close', () => {
        input.style.visibility = 'visible'
        input.focus()
        proc = null
      })
    } else {
      appendRow()
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
