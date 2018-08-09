import { exec } from 'child_process'
import os from 'os'

// Find the current foreground pid and cmd for a pid
export function foreground(pid, cmd) {
  return new Promise((resolve, reject) => {
    exec(
      `ps -o ppid,stat,pid,command | awk '$1==${pid} && $2=="S+" {$1=$2=""; print $0}'`,
      (err, stdout) => {
        if (err) reject(err)
        else {
          stdout = stdout.trim()
          // If we find a child proc, recurse on that, else return input cmd
          if (stdout) {
            const match = stdout.match(/(\d+) (.+)/)
            resolve(foreground(match[1], match[2]))
          } else {
            const res = { pid }
            if (cmd) res.cmd = cmd.replace(os.homedir(), '~')
            resolve(res)
          }
        }
      }
    )
  })
}

// Get the cwd for a pid
export function cwd(pid) {
  return new Promise((resolve, reject) => {
    exec(
      `lsof -a -d cwd -p ${pid} | tail -n 1 | awk '{$1=$2=$3=$4=$5=$6=$7=$8=""; print $0}'`,
      (err, stdout) => {
        if (err) reject(err)
        else resolve(stdout.trim())
      }
    )
  })
}

// Get git status for a directory
export function gitStatus(dir) {
  return new Promise((resolve, reject) => {
    exec(`git status -b --porcelain=v2 | head -4`, { cwd: dir }, (err, stdout) => {
      if (err) reject(err)
      else {
        const branch = stdout.match(/^# branch\.head (\w+)/m)
        if (branch) {
          const ab = stdout.match(/^# branch\.ab \+(\d) -(\d)/m)
          resolve({ branch: branch[1], plus: parseInt(ab[1]), minus: parseInt(ab[2]) })
        } else resolve()
      }
    })
  })
}
