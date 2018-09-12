import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import escapeStrRegexp from 'escape-string-regexp'

async function init() {
  const sansPath = path.join(os.homedir(), '.sans')
  const sessionsPath = path.join(sansPath, 'sessions')
  const scriptsPath = path.join(sansPath, 'scripts')

  await fs.ensureDir(sansPath)
  await fs.emptyDir(sessionsPath)
  await fs.emptyDir(scriptsPath)

  await fs.copyFile(path.join(__dirname, '../bash-init.sh'), path.join(scriptsPath, 'bash-init.sh'))
  await fs.copyFile(path.join(__dirname, '../zsh-init.sh'), path.join(scriptsPath, 'zsh-init.sh'))

  const bashPreExec = path.join(__dirname, '../../node_modules/bash-preexec/bash-preexec.sh')
  await fs.copyFile(bashPreExec, path.join(scriptsPath, 'bash-preexec.sh'))

  await maybeAddInitScript('bash')
  await maybeAddInitScript('zsh')
}

async function maybeAddInitScript(shell) {
  const filePath = path.join(os.homedir(), `.${shell}rc`)
  if (await fs.exists(filePath)) {
    const content = await fs.readFile(filePath)
    const str = `[ $TERM_PROGRAM = 'Sans' ] && . ${os.homedir()}/.sans/scripts/${shell}-init.sh`
    const contains = new RegExp(`^${escapeStrRegexp(str)}$`, 'm').test(content)
    if (!contains) await fs.appendFile(filePath, `\n${str}\n`)
  }
}

module.exports = {
  init
}
