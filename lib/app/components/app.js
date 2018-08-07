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

    shell.pty.on('exit', () => {
      _.pull(this.state.shells, shell)
      this.setState({ shells: this.state.shells })
    })

    shell.pty.on('data', () => {
      shell.pollsLeft = 5
      if (!shell.polling) this.pollShellCmd(shell)
    })

    shell.cmd = shell.pty.process

    return shell
  }

  pollShellCmd = async shell => {
    shell.polling = true
    shell.cmd = (await proc.foreground(shell.pty.pid, shell.pty.process)).cmd
    this.setState({ shells: this.state.shells })
    shell.pollsLeft -= 1
    if (shell.pollsLeft > 0) setTimeout(() => this.pollShellCmd(shell), 200)
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
    paddingLeft: '80px',
    WebkitAppRegion: 'drag'
  },
  term: {
    position: 'absolute',
    top: '50px',
    bottom: '15px',
    left: '15px',
    right: '10px' // scrollbar is 5px
  },
  termHidden: {
    visibility: 'hidden'
  },
  termHeader: {
    padding: '0 10px',
    marginRight: '-10px',
    color: '#f8f8f2',
    flex: 1,
    height: '25px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    lineHeight: '25px',
    textAlign: 'center',
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
