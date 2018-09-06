import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import escapeStrRegexp from 'escape-string-regexp'

function init() {
  const sans = path.join(os.homedir(), '.sans')
  const sessions = path.join(sans, 'sessions')
  const scripts = path.join(sans, 'scripts')

  if (!fs.existsSync(sans)) fs.mkdirSync(sans)
  if (!fs.existsSync(sessions)) fs.mkdirSync(sessions)
  else fs.emptyDirSync(sessions)
  if (!fs.existsSync(scripts)) fs.mkdirSync(scripts)
  else fs.emptyDirSync(scripts)

  fs.copyFileSync(path.join(__dirname, '../bash-init.sh'), path.join(scripts, 'bash-init.sh'))
  fs.copyFileSync(path.join(__dirname, '../zsh-init.sh'), path.join(scripts, 'zsh-init.sh'))

  const bashPreExec = path.join(__dirname, '../../node_modules/bash-preexec/bash-preexec.sh')
  fs.copyFileSync(bashPreExec, path.join(scripts, 'bash-preexec.sh'))

  const config = path.join(sans, 'config.json')
  if (!fs.existsSync(config)) {
    fs.writeFile(
      config,
      Buffer.from(
        JSON.stringify(
          {
            shell: '/bin/bash'
          },
          null,
          2
        ) + '\n'
      )
    )
  }

  maybeAddInitScript('bash', path.join(os.homedir(), '.bashrc'))
  maybeAddInitScript('zsh', path.join(os.homedir(), '.zshrc'))
}

function maybeAddInitScript(shell, path) {
  if (fs.existsSync(path)) {
    const content = fs.readFileSync(path)
    const str = `[ $TERM_PROGRAM = 'Sans' ] && . ${os.homedir()}/.sans/scripts/${shell}-init.sh`
    const contains = new RegExp(`^${escapeStrRegexp(str)}$`, 'm').test(content)
    if (!contains) fs.appendFileSync(path, `\n${str}\n`)
  }
}

module.exports = {
  init
}
