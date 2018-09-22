import os from 'os'
import path from 'path'
import _ from 'lodash'

export function parseCmd(cmd) {
  const parts = cmd.split(' ')
  if (parts.length) parts[0] = path.basename(parts[0])
  return parts.join(' ')
}

export function parsePwd(pwd) {
  return pwd
    .replace(os.homedir(), '~')
    .split(pwd === '/' ? '' : '/')
    .reverse()[0]
    .trim()
}

export function parseGit(git) {
  const branch = git.match(/^# branch\.head (.+)$/m)
  const dirty = git.match(/^# branch\.ab ((\+[^0]+ -0)|(\+0 -[^0]+)|(\+[^0]+ -[^0]+))$/m)
  if (branch) {
    let str = branch[1]
    if (dirty) str += '*'
    return str
  }
}
