const pty = require('node-pty')
const { Terminal } = require('xterm')
const fit = require('xterm/lib/addons/fit/fit')
const colors = require('./colors')

Terminal.applyAddon(fit)

// node-pty init
const shell = pty.spawn('bash', ['--login'], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: process.env
})

// xterm init
const xterm = new Terminal({
  fontFamily: 'Monaco',
  fontSize: 12,
  allowTransparency: true,
  theme: colors.dracula
})
xterm.open(document.getElementById('xterm'))
window.addEventListener('resize', () => xterm.fit())
xterm.fit()
xterm.focus()

// Link node-pty and xterm
xterm.on('data', data => shell.write(data))
shell.on('data', data => xterm.write(data))
xterm.on('resize', ({ cols, rows }) => shell.resize(cols, rows))
