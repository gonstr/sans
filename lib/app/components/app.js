import { remote } from 'electron'
import os from 'os'
import React, { Component } from 'react'
import { cx, css } from 'emotion'

import * as sessions from '../sessions'
import appstyles from '../styles'
import Term from './term'

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
  headerFullscreen: css`
    padding-left: 10px;
  `,
  term: css`
    position: absolute;
    top: 45px;
    bottom: 10px; /* Not symetric but looks best since term height from bottom is inconsistent */
    left: 10px;
    right: 5px; /* scrollbar is 5px */
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
    this.state = { sessions: [], fullscreen: false }
  }

  componentDidMount = () => {
    const session = sessions.create()
    session.on('pwd', () => this.forceUpdate())
    session.on('cmd', () => this.forceUpdate())
    session.on('branch', () => this.forceUpdate())

    const win = remote.getCurrentWindow()
    win.on('enter-full-screen', this.enterFullscreen)
    win.on('leave-full-screen', this.exitFullscreen)

    this.setState({ sessions: [session], active: session, fullscreen: win.isFullScreen() })
  }

  componentWillUnmount = () => {
    const win = remote.getCurrentWindow()
    win.removeListener('enter-full-screen', this.enterFullscreen)
    win.removeListener('leave-full-screen', this.exitFullscreen)
  }

  enterFullscreen = () => this.setState({ fullscreen: true })

  exitFullscreen = () => this.setState({ fullscreen: false })

  termHeaderClicked = session => this.setState({ active: session })

  parseDir = dir =>
    dir
      .replace(os.homedir(), '~')
      .split(dir === '/' ? '' : '/')
      .reverse()[0]

  render() {
    const { sessions, active, fullscreen } = this.state

    return (
      <div className={styles.container}>
        <div className={cx(styles.header, { [styles.headerFullscreen]: fullscreen })}>
          {sessions.map((ses, i) => (
            <div
              className={cx(
                styles.termHeader,
                { [appstyles.bumpBg]: i === sessions.length - 1 },
                { [styles.termHeaderActive]: ses === active }
              )}
              key={i}
              onClick={() => this.termHeaderClicked(ses)}
            >
              {
                // Hack to get consistency from direction: ltr for cwd ~ and /
                // without this single no word chars break the text direction :?
                <span style={{ visibility: 'hidden', fontSize: '0' }}>'abc'</span>
              }
              <span>{this.parseDir(ses.pwd || '')} </span>
              {ses.branch && (
                <span>
                  <span className={appstyles.cyan}>({ses.branch.trim()})</span>
                </span>
              )}
              <span className={appstyles.blue}> - </span>
              {ses.cmd || ses.pty.process}
            </div>
          ))}
        </div>
        {sessions.map((ses, i) => (
          <div className={cx(styles.term, { hidden: ses !== active })} key={i}>
            <Term pty={ses.pty} active={ses === active} />
          </div>
        ))}
      </div>
    )
  }
}
