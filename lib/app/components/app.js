import { remote, ipcRenderer } from 'electron'
import React, { Component } from 'react'
import { cx, css } from 'emotion'
import _ from 'lodash'
import Mousetrap from 'mousetrap'

import events from '../events'
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
    -webkit-app-region: drag;
  `,
  headerFullscreen: css`
    padding-left: 10px;
  `,
  term: css`
    position: absolute;
    top: 45px;
    bottom: 0;
    left: 0;
    right: 0;
  `,
  find: css`
    background: #f8f8f2;
    align-self: flex-start;
    max-width: 0;
    height: 25px;
    margin-left: 10px;
    transition: max-width 0.1s, margin-left 0.1s;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%);
  `,
  findVisible: css`
    margin-left: 0;
    padding-left: 10px;
    max-width: 100%;
  `,
  findInput: css`
    font-family: inherit;
    font-size: 12px;
    margin: 5px;
    width: 200px;
    border: none;
    outline: none;
    background: transparent;
    color: #282a36;
  `
}

export default class App extends Component {
  constructor() {
    super()
    this.state = { sessions: [], fullscreen: false, zoom: 0, findVisible: false, findValue: '' }
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

    ipcRenderer.on('Close Shell', () => {
      const { active, sessions } = this.state
      const index = sessions.indexOf(active)
      _.pull(sessions, active)
      const newActive = sessions[index === 0 ? 0 : index - 1]
      active.close()
      if (sessions.length) this.setState({ sessions, active: newActive })
      else remote.getCurrentWindow().close()
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

    ipcRenderer.on('Actual Size', () => this.setState({ zoom: 0 }))
    ipcRenderer.on('Zoom In', () => this.setState({ zoom: Math.min(this.state.zoom + 1, 15) }))
    ipcRenderer.on('Zoom Out', () => this.setState({ zoom: Math.max(this.state.zoom - 1, -5) }))

    ipcRenderer.on('move', () => (this.moved = true))

    ipcRenderer.on('Find...', this.showFind)
    this.mousetrap = new Mousetrap(this.findInputRef)
    this.mousetrap.bind('esc', this.hideFind)
    this.mousetrap.bind('enter', () => {
      events.emitter.emit(events.types.FIND_NEXT, this.findInputRef.value)
    })
    ipcRenderer.on('Find Next', () => {
      events.emitter.emit(events.types.FIND_NEXT, this.findInputRef.value)
    })
    ipcRenderer.on('Find Previous', () => {
      events.emitter.emit(events.types.FIND_PREVIOUS, this.findInputRef.value)
    })

    const ses = new Session()

    this.setState({ sessions: [ses], active: ses, fullscreen: win.isFullScreen() })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { findVisible } = this.state
    if (findVisible && !prevState.findVisible) this.findInputRef.focus()
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

  showFind = () => this.setState({ findVisible: true })
  hideFind = () => {
    events.emitter.emit(events.types.HIDE_FIND)
    this.setState({ findVisible: false })
  }
  findValueChanged = e => this.setState({ findValue: e.target.value })

  render() {
    const { sessions, active, fullscreen, zoom, findVisible, findValue } = this.state

    return (
      <div className={styles.container} onClick={() => this.appClicked()}>
        <div className={cx(styles.header, { [styles.headerFullscreen]: fullscreen })}>
          {sessions.map((ses, i) => (
            <TermHeader
              key={ses.pty.pid}
              last={i === sessions.length - 1}
              ses={ses}
              active={ses === active}
              onClick={() => this.termHeaderClicked(ses)}
            />
          ))}
          <div className={cx(styles.find, { [styles.findVisible]: findVisible })}>
            <input
              className={styles.findInput}
              ref={ref => (this.findInputRef = ref)}
              value={findValue}
              onChange={this.findValueChanged}
              onBlur={this.hideFind}
              type="text"
            />
          </div>
        </div>
        {sessions.map((ses, i) => (
          <div
            className={cx(styles.term, { [appstyles.hidden]: ses !== active })}
            key={ses.pty.pid}>
            <Term pty={ses.pty} active={ses === active} zoom={zoom} />
          </div>
        ))}
      </div>
    )
  }
}
