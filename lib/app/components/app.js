const React = require('react')
const os = require('os')
const _ = require('lodash')
const { spawn } = require('node-pty')
const locale = require('os-locale')

const { name, version } = require('../../../package')
const Term = require('./term')
const proc = require('../proc')

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      shells: []
    }
  }

  componentDidMount = () => {
    const shell = this.spawnShell()

    this.setState({
      shells: [shell, this.spawnShell()],
      activeShell: shell
    })
  }

  spawnShell = (cwd = os.homedir()) => {
    // node-pty init
    const env = Object.assign(
      {
        LANG: locale.sync() + '.UTF-8'
      },
      process.env,
      {
        TERM: 'xterm-256color',
        COLORTERM: 'truecolor',
        TERM_PROGRAM: name,
        TERM_PROGRAM_VERSION: version
      }
    )

    // https://github.com/zeit/hyper/issues/696
    delete env.GOOGLE_API_KEY

    const shell = {}

    shell.pty = spawn('bash', ['--login'], {
      name: 'xterm-color',
      cols: 100,
      rows: 40,
      cwd,
      env
    })

    shell.cwd = cwd
    shell.cmd = shell.pty.process

    shell.pty.on('exit', () => {
      shell.pollsLeft = 0
      shell.polling = false
      _.pull(this.state.shells, shell)
      this.setState({ shells: this.state.shells })
    })

    shell.pty.on('data', () => {
      shell.pollsLeft = 5
      if (!shell.polling) this.poll(shell)
    })

    return shell
  }

  poll = async shell => {
    shell.polling = true
    const pidInfo = await proc.pidInfo(shell.pty.pid)
    shell.cmd = pidInfo.cmd || shell.pty.process
    shell.git = await proc.gitInfo(pidInfo.cwd)
    shell.cwd = pidInfo.cwd
    this.setState({ shells: this.state.shells })
    shell.pollsLeft -= 1
    if (shell.pollsLeft > 0) setTimeout(() => this.poll(shell), 200)
    else shell.polling = false
  }

  termHeaderClicked = shell => this.setState({ activeShell: shell })

  render() {
    const { shells, activeShell } = this.state

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          {shells.map((shell, i) => (
            <div
              style={Object.assign(
                {},
                styles.termHeader,
                shell === activeShell ? styles.termHeaderActive : {},
                i === shells.length - 1 ? styles.termHeaderLast : {}
              )}
              key={i}
              onClick={() => this.termHeaderClicked(shell)}
            >
              {
                shell.cwd
                  .replace(os.homedir(), '~')
                  .split(shell.cwd === '/' ? '' : '/')
                  .reverse()[0]
              }{' '}
              {shell.git && (
                <span>
                  <span style={styles.cyan}>{shell.git.branch}</span>
                  {!!shell.git.plus && <span style={styles.green}> +{shell.git.plus}</span>}
                  {!!shell.git.minus && <span style={styles.red}> -{shell.git.minus}</span>}
                </span>
              )}
              <span style={styles.blue}> - </span>
              {shell.cmd}
            </div>
          ))}
        </div>
        {shells.map((shell, i) => (
          <div
            style={Object.assign({}, styles.term, shell !== activeShell ? styles.termHidden : {})}
            key={i}
          >
            <Term pty={shell.pty} active={shell === activeShell} />
          </div>
        ))}
      </div>
    )
  }
}

const styles = {
  cyan: {
    color: '#8be9fd'
  },
  blue: {
    color: '#bd93f9'
  },
  red: {
    color: '#ff5555'
  },
  green: {
    color: '#50fa7b'
  },
  push: {
    marginLeft: '5px'
  },
  container: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    background: 'hsl(231, 15%, 28%)',
    height: '35px',
    paddingLeft: '75px',
    WebkitAppRegion: 'drag'
  },
  term: {
    position: 'absolute',
    top: '50px',
    bottom: '10px', // Not symetric but looks best since term height from bottom is inconsistent
    left: '15px',
    right: '10px' // scrollbar is 5px
  },
  termHidden: {
    visibility: 'hidden'
  },
  termHeader: {
    padding: '0 20px',
    marginRight: '-10px',
    color: '#f8f8f2',
    flex: 1,
    height: '25px',
    lineHeight: '25px',
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    background: 'hsl(231, 15%, 38%)',
    clipPath: 'polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%)'
  },
  termHeaderActive: {
    background: 'hsl(231, 15%, 18%)',
    transition: 'background .1s',
    zIndex: 1
  },
  termHeaderLast: {
    marginRight: '10px'
  }
}

module.exports = App
