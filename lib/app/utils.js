import os from 'os'

export function parsePwd(pwd) {
  return pwd
    .replace(os.homedir(), '~')
    .split(pwd === '/' ? '' : '/')
    .reverse()[0]
}

export function parseGit(git) {
  const match = git.match(/^## ([^.]+)(\.\.\.\S+)?( \[.+\])?$/m)
  if (match) {
    let str = match[1].trim()
    if (match[3]) str += '*'
    return str
  }
}
