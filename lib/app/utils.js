import os from 'os'

export function parsePwd(pwd) {
  return pwd
    .replace(os.homedir(), '~')
    .split(pwd === '/' ? '' : '/')
    .reverse()[0]
}

export function parseGit(git) {
  const branch = git.match(/^# branch.head (.+)$/m)
  const dirty = git.match(/^# branch.ab/m)
  if (branch) {
    let str = branch[1]
    if (dirty) str += '*'
    return str
  }
}
