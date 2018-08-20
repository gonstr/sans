import { remote, ipcRenderer } from 'electron'
import React, { Component } from 'react'
import { cx, css } from 'emotion'
import _ from 'lodash'

import Session from '../session'
import appstyles from '../styles'
import Term from './term'
import TermHeader from './term-header'

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
    padding-right: 20px;
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
      const ses = new Session(active.pwd)
      sessions.splice(index + 1, 0, ses)
      this.setState({ sessions, active: ses })
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

    ipcRenderer.on('move', () => (this.moved = true))

    const ses = new Session()

    this.setState({ sessions: [ses], active: ses, fullscreen: win.isFullScreen() })

    setTimeout(() => this.setState({ visible: true }), 200)
  }

  enterFullscreen = () => this.setState({ fullscreen: true })
  exitFullscreen = () => this.setState({ fullscreen: false })

  // When we get a move event from main process the moved flag is set to true.
  // When a click bubbles up to the component container, we set the move flag to false.
  // Headers onClick is only responsive if move is false when onClick is triggered.
  // Which means:
  // if a move event is received the next onClick is ignored since the user is moving the window
  appClicked = () => (this.moved = false)
  termHeaderClicked = session => {
    if (!this.moved) this.setState({ active: session })
  }

  render() {
    const { sessions, active, fullscreen, visible } = this.state

    return (
      <div className={styles.container} onClick={() => this.appClicked()}>
        <div className={cx(styles.header, { [styles.headerFullscreen]: fullscreen })}>
          {sessions.map((ses, i) => (
            <TermHeader
              key={ses.pty.pid}
              ses={ses}
              active={ses === active}
              visible={visible}
              onClick={() => this.termHeaderClicked(ses)}
            />
          ))}
        </div>
        {sessions.map((ses, i) => (
          <div
            className={cx(styles.term, {
              [appstyles.hidden]: ses !== active
            })}
            key={ses.pty.pid}>
            <Term pty={ses.pty} active={ses === active} />
          </div>
        ))}
      </div>
    )
  }
}
