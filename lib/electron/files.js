import fs from 'fs-extra'
import os from 'os'
import path from 'path'

function init() {
  const sans = path.join(os.homedir(), '.sans')
  const sessions = path.join(sans, 'sessions')
  const scripts = path.join(sans, 'scripts')
  const bashPreExec = path.join(__dirname, '../../node_modules/bash-preexec/bash-preexec.sh')

  if (!fs.existsSync(sans)) fs.mkdirSync(sans)
  if (!fs.existsSync(sessions)) fs.mkdirSync(sessions)
  else fs.emptyDirSync(sessions)
  if (!fs.existsSync(scripts)) fs.mkdirSync(scripts)
  else fs.emptyDirSync(scripts)
  fs.copyFileSync(path.join(__dirname, '../bash-init.sh'), path.join(scripts, 'bash-init.sh'))
  fs.copyFileSync(path.join(__dirname, '../zsh-init.sh'), path.join(scripts, 'zsh-init.sh'))
  fs.copyFileSync(bashPreExec, path.join(scripts, 'bash-preexec.sh'))
}

module.exports = {
  init
}
