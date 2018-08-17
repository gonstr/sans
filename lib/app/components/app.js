import { remote, ipcRenderer } from 'electron'
import os from 'os'
import React, { Component } from 'react'
import { cx, css } from 'emotion'
import _ from 'lodash'

import { create as createSession } from '../sessions'
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
  `,
  termHeaderText: css`
    opacity: 0;
    transition: opacity 0.5s;
  `,
  termHeaderTextVisible: css`
    opacity: 1;
  `
}

export default class App extends Component {
  constructor() {
    super()
    this.state = { sessions: [], fullscreen: false, visible: false }
  }

  componentDidMount = () => {
    const win = remote.getCurrentWindow()
    win.on('enter-full-screen', this.enterFullscreen)
    win.on('leave-full-screen', this.exitFullscreen)

    ipcRenderer.on('New Tab', () => {
      const { sessions, active } = this.state
      const index = sessions.indexOf(active)
      const session = this.createSession()
      sessions.splice(index + 1, 0, session)
      this.setState({ sessions, active: session })
    })

    ipcRenderer.on('Close Window', () => {
      const { active, sessions } = this.state
      const index = sessions.indexOf(active)
      _.pull(sessions, active)
      const newActive = sessions[index === 0 ? 0 : index - 1]
      active.close()
      if (sessions.length) this.setState({ sessions, active: newActive })
      else remote.app.quit()
    })

    ipcRenderer.on('Show Previous Tab', () => {
      const { active, sessions } = this.state
      const index = sessions.indexOf(active)
      const newActive = sessions[index === 0 ? sessions.length - 1 : index - 1]
      this.setState({ active: newActive })
    })

    ipcRenderer.on('Show Next Tab', () => {
      const { active, sessions } = this.state
      const index = sessions.indexOf(active)
      const newActive = sessions[index < sessions.length - 1 ? index + 1 : 0]
      this.setState({ active: newActive })
    })

    const session = this.createSession()

    this.setState({ sessions: [session], active: session, fullscreen: win.isFullScreen() })

    setTimeout(() => this.setState({ visible: true }), 200)
  }

  createSession = () => {
    const session = createSession()
    session.on('pwd', () => this.forceUpdate())
    session.on('cmd', () => this.forceUpdate())
    session.on('git', () => this.forceUpdate())
    return session
  }

  enterFullscreen = () => this.setState({ fullscreen: true })

  exitFullscreen = () => this.setState({ fullscreen: false })

  termHeaderClicked = session => this.setState({ active: session })

  parsePwd = pwd =>
    pwd
      .replace(os.homedir(), '~')
      .split(pwd === '/' ? '' : '/')
      .reverse()[0]

  parseGit = git => {
    const match = git.match(/^## ([^.]+)(\.\.\..+)?$/m)
    return match && match[1].trim()
  }

  render() {
    const { sessions, active, fullscreen, visible } = this.state

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
              key={ses.pty.pid}
              onClick={() => this.termHeaderClicked(ses)}
            >
              <span
                className={cx(styles.termHeaderText, { [styles.termHeaderTextVisible]: visible })}
              >
                {
                  // Hack to get consistency from direction: ltr for cwd ~ and /
                  // without this single no word chars break the text direction :?
                  <span style={{ visibility: 'hidden', fontSize: '0' }}>'abc'</span>
                }
                <span>{this.parsePwd(ses.pwd || '')} </span>
                {ses.git && (
                  <span>
                    <span className={appstyles.cyan}>({this.parseGit(ses.git)})</span>
                  </span>
                )}
                <span className={appstyles.blue}> - </span>
                {ses.cmd || ses.pty.process}
              </span>
            </div>
          ))}
        </div>
        {sessions.map((ses, i) => (
          <div
            className={cx(styles.term, {
              [appstyles.hidden]: ses !== active
            })}
            key={ses.pty.pid}
          >
            <Term pty={ses.pty} active={ses === active} />
          </div>
        ))}
      </div>
    )
  }
}
