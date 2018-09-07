import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import escapeStrRegexp from 'escape-string-regexp'

function init() {
  const sansPath = path.join(os.homedir(), '.sans')
  const sessionsPath = path.join(sansPath, 'sessions')
  const scriptsPath = path.join(sansPath, 'scripts')

  if (!fs.existsSync(sansPath)) fs.mkdirSync(sansPath)
  if (!fs.existsSync(sessionsPath)) fs.mkdirSync(sessionsPath)
  else fs.emptyDirSync(sessionsPath)
  if (!fs.existsSync(scriptsPath)) fs.mkdirSync(scriptsPath)
  else fs.emptyDirSync(scriptsPath)

  fs.copyFileSync(path.join(__dirname, '../bash-init.sh'), path.join(scriptsPath, 'bash-init.sh'))
  fs.copyFileSync(path.join(__dirname, '../zsh-init.sh'), path.join(scriptsPath, 'zsh-init.sh'))

  const bashPreExec = path.join(__dirname, '../../node_modules/bash-preexec/bash-preexec.sh')
  fs.copyFileSync(bashPreExec, path.join(scriptsPath, 'bash-preexec.sh'))

  maybeAddInitScript('bash')
  maybeAddInitScript('zsh')
}

function maybeAddInitScript(shell) {
  const filePath = path.join(os.homedir(), `.${shell}rc`)
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath)
    const str = `[ $TERM_PROGRAM = 'Sans' ] && . ${os.homedir()}/.sans/scripts/${shell}-init.sh`
    const contains = new RegExp(`^${escapeStrRegexp(str)}$`, 'm').test(content)
    if (!contains) fs.appendFileSync(filePath, `\n${str}\n`)
  }
}

module.exports = {
  init
}
