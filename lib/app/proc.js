const { exec } = require('child_process')
const os = require('os')

// Get the current foreground cmd for a pid
async function foreground(pid, cmd) {
  async function helper(pid, cmd) {
    return Promise((resolve, reject) => {
      exec(
        `ps -o ppid,stat,pid,command | awk '$1==${pid} && $2=="S+" {$1=$2=""; print $0}'`,
        (err, stdout) => {
          if (err) reject(err)
          else {
            stdout = stdout.trim()
            // If we find a child proc, recurse on that, else return input cmd
            if (stdout) {
              const match = stdout.match(/(\d+) (.+)/)
              helper(match[1], match[2])
            } else resolve({ pid, cmd: cmd.replace(os.homedir(), '~') })
          }
        }
      )
    })
  }

  return helper(pid, cmd)
}

module.exports = {
  foreground
}
