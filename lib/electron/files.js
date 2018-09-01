import fs from 'fs-extra'
import os from 'os'
import path from 'path'

function init() {
  const sans = path.join(os.homedir(), '.sans')
  const sessions = path.join(sans, 'sessions')
  const bashPreExec = path.join(__dirname, '../../node_modules/bash-preexec/bash-preexec.sh')

  if (!fs.existsSync(sans)) fs.mkdirSync(sans)
  if (!fs.existsSync(sessions)) fs.mkdirSync(sessions)
  else fs.emptyDirSync(sessions)
  fs.copyFileSync(path.join(__dirname, '../bash-init.sh'), path.join(sans, 'bash-init.sh'))
  fs.copyFileSync(path.join(__dirname, '../zsh-init.sh'), path.join(sans, 'zsh-init.sh'))
  fs.copyFileSync(bashPreExec, path.join(sans, 'bash-preexec.sh'))
}

module.exports = {
  init
}
