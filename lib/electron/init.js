import fs from 'fs'
import os from 'os'
import path from 'path'

module.exports = () => {
  const sans = path.join(os.homedir(), '.sans')
  const sessions = path.join(sans, 'sessions')
  const initSh = path.join(path.join(__dirname, '../init.sh'))
  const bashPreExec = path.join(__dirname, '../../node_modules/bash-preexec/bash-preexec.sh')

  if (!fs.existsSync(sans)) fs.mkdirSync(sans)
  if (!fs.existsSync(sessions)) fs.mkdirSync(sessions)
  fs.copyFileSync(initSh, path.join(sans, 'init.sh'))
  fs.copyFileSync(bashPreExec, path.join(sans, 'bash-preexec.sh'))
}
