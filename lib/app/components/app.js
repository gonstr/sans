import React, { Component } from 'react'
const _ = require('lodash')
const { exec } = require('child_process')
const os = require('os')
const { spawn } = require('node-pty')
const locale = require('os-locale')

import { name, version } from '../../../package'
import Term from './term'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      shells: []
    }
  }

  componentDidMount() {
    const shell = { pty: this.spawnPty() }

    this.setState({
      shells: [shell, { pty: this.spawnPty() }],
      activeShell: shell
    })
  }

  spawnPty(cwd = os.homedir()) {
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
    // if (env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY === env.GOOGLE_API_KEY) {
    //   delete env.GOOGLE_API_KEY
    // }

    const pty = spawn('bash', ['--login'], {
      name: 'xterm-color',
      cols: 100,
      rows: 40,
      cwd,
      env
    })

    pty.on('data', () => {
      exec(
        `ps -o ppid,stat,command | awk '$1==${pty.pid} && $2=="S+" {$1=$2=""; print $0}'`,
        (err, stdout) => {
          if (!err) {
            _.find(this.state.shells, { pty }).cmd = (stdout || '')
              .trim()
              .replace(os.homedir(), '~')
            this.setState({ shells: this.state.shells })
          }
        }
      )
    })

    pty.on('exit', () =>
      this.setState({
        shells: this.state.shells.filter(shell => shell.pty !== pty)
      })
    )

    return pty
  }

  termHeaderClicked(shell) {
    this.setState({
      activeShell: shell
    })
  }

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
              {shell.cmd || shell.pty.process}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#f8f8f2',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    width: '200px',
    height: '25px',
    background: 'hsl(231, 15%, 38%)'
  },
  termHeaderActive: {
    background: 'hsl(231, 15%, 18%)'
  },
  termHeaderNotLast: {
    marginRight: '10px'
  }
}
