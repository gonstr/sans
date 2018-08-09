import React, { Component } from 'react'
import { cx, css } from 'emotion'
import os from 'os'
import _ from 'lodash'
import { spawn } from 'node-pty'
import locale from 'os-locale'

import { name, version } from '../../../package'
import Term from './term'
import * as proc from '../proc'

const styles = {
  container: css`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  header: css`
    display: flex;
    align-items: flex-end;
    background: hsl(231, 15%, 28%);
    height: 35px;
    padding-left: 75px;
    -webkit-app-region: drag;
  `,
  term: css`
    position: absolute;
    top: 50px;
    bottom: 10px; /* Not symetric but looks best since term height from bottom is inconsistent */
    left: 15px;
    right: 10px; /* scrollbar is 5px */
  `,
  termHeader: css`
    padding: 0 20px;
    margin-right: -10px;
    color: #f8f8f2;
    flex: 1;
    height: 25px;
    line-height: 25px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    direction: rtl;
    background: hsl(231, 15%, 38%);
    clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%);
  `,
  termHeaderActive: css`
    background: hsl(231, 15%, 18%);
    transition: background 0.1s;
    z-index: 1;
  `
}

export default class App extends Component {
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
      <div className={styles.container}>
        <div className={styles.header}>
          {shells.map((shell, i) => (
            <div
              className={cx({ 'bump-bg': i === shells.length - 1 }, styles.termHeader, {
                [styles.termHeaderActive]: shell === activeShell
              })}
              key={i}
              onClick={() => this.termHeaderClicked(shell)}
            >
              {
                // Hack to get consistency from direction: ltr for cwd ~ and /
                <span style={{ visibility: 'hidden', fontSize: '0' }}>'abc'</span>
              }
              {
                <span>
                  {
                    shell.cwd
                      .replace(os.homedir(), '~')
                      .split(shell.cwd === '/' ? '' : '/')
                      .reverse()[0]
                  }
                </span>
              }{' '}
              {shell.git && (
                <span>
                  <span className="cyan">{shell.git.branch}</span>
                  {!!shell.git.plus && <span className="green"> +{shell.git.plus}</span>}
                  {!!shell.git.minus && <span className="red"> -{shell.git.minus}</span>}
                </span>
              )}
              <span className="blue"> - </span>
              {shell.cmd}
            </div>
          ))}
        </div>
        {shells.map((shell, i) => (
          <div className={cx(styles.term, { hidden: shell !== activeShell })} key={i}>
            <Term pty={shell.pty} active={shell === activeShell} />
          </div>
        ))}
      </div>
    )
  }
}
