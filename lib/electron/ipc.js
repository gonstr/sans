import net from 'net'
import fs from 'fs-extra'

import window from './window'
import id from './id'

const fd = `/tmp/sans.${id()}`

async function init() {
  if (await fs.exists(fd)) await fs.unlink(fd)

  const server = net.createServer(listener => {
    listener.on('data', data => {
      const [pid, cmd, ...rest] = data.toString().split(' ')

      const json = {
        pid: parseInt(pid),
        cmd,
        message: rest.join(' ')
      }

      window.windows.forEach(w => w.webContents.send('shell_message', json))
    })
  })

  server.on('error', err => {
    throw err
  })

  server.listen(fd)
}

module.exports = {
  cleanup: () => fs.unlink(fd),
  init,
  fd
}
