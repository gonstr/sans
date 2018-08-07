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
      clearInterval(shell.poll)
      _.pull(this.state.shells, shell)
      this.setState({ shells: this.state.shells })
    })

    shell.cmd = shell.pty.process

    shell.poll = setInterval(async () => {
      shell.cmd = (await proc.foreground(shell.pty.pid, shell.pty.process)).cmd
      this.setState({ shells: this.state.shells })
    }, 1000)

    return shell
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
                i !== shells.length ? styles.termHeaderNotLast : {}
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
    right: 0,
    display: 'flex',
    flexDirection: 'column'
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
    right: 0
  },
  termHidden: {
    visibility: 'hidden'
  },
  termHeader: {
    padding: '0 10px',
    color: '#f8f8f2',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    width: '200px',
    height: '25px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    lineHeight: '25px',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    background: 'hsl(231, 15%, 38%)'
  },
  termHeaderActive: {
    background: 'hsl(231, 15%, 18%)'
  },
  termHeaderNotLast: {
    marginRight: '10px'
  }
}

module.exports = App
