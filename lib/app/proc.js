const { exec } = require('child_process')
const os = require('os')

// Get the current foreground cmd for a pid
async function pidInfo(pid) {
  async function helper(pid, cmd) {
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
              resolve(helper(match[1], match[2]))
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

  return helper(pid)
}

module.exports = {
  pidInfo
}
