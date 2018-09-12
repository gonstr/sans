import { ipcRenderer } from 'electron'
import React, { Component } from 'react'
import _ from 'lodash'
import { css, cx } from 'emotion'
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
import * as search from 'xterm/lib/addons/search/search'

import events from '../events'
import { dracula } from '../themes'

Terminal.applyAddon(fit)
Terminal.applyAddon(search)

const styles = {
  container: css`
    height: 100%;
    transition: opacity 0.1s;
    opacity: 0;
  `,
  visibile: css`
    opacity: 1;
  `
}

export default class Term extends Component {
  constructor() {
    super()
    this.fit = _.debounce(this.fit.bind(this), 20, { leading: true, trailing: true })
    this.state = { visibile: false }
  }

  componentDidMount = () => {
    // xterm init
    this.xterm = new Terminal({
      fontFamily: 'Menlo, monospace',
      fontSize: 12,
      //experimentalCharAtlas: 'dynamic',
      fontWeight: 'normal',
      fontWeightBold: 'bold',
      //rendererType: 'dom',
      allowTransparency: true, // Weird artifacts on resize window without this :/
      theme: dracula
    })
    this.xterm.open(this.termRef)
    window.addEventListener('resize', this.fit, { passive: true })

    // pty/xterm bindings
    this.xterm.on('data', data => this.props.pty.write(data))
    this.props.pty.on('data', data => this.xterm.write(data))
    this.xterm.on('resize', ({ cols, rows }) => this.props.pty.resize(cols, rows))

    ipcRenderer.on('Clear', this.clear)

    setTimeout(() => {
      this.fit()
      this.xterm.focus()
    })

    events.emitter.on(events.types.FIND_NEXT, this.findNext)
    events.emitter.on(events.types.FIND_PREVIOUS, this.findPrevious)
    events.emitter.on(events.types.HIDE_FIND, this.hideFind)

    this.setState({ visibile: true })
  }

  componentDidUpdate = prevProps => {
    const { active, zoom } = this.props
    if (active && !prevProps.active) this.xterm.focus()
    const fontSize = 12 + zoom
    if (this.xterm.getOption('fontSize') !== fontSize) {
      this.xterm.setOption('fontSize', fontSize)
      this.xterm.fit()
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.fit)
    ipcRenderer.removeListener('Clear', this.clear)

    this.xterm.dispose()
    this.props.pty.kill()

    events.emitter.removeListener(events.types.FIND_NEXT, this.findNext)
    events.emitter.removeListener(events.types.FIND_PREVIOUS, this.findPrevious)
    events.emitter.removeListener(events.types.HIDE_FIND, this.hideFind)
  }

  clear = () => this.props.active && this.xterm.clear()

  fit = () => this.xterm.fit()

  findNext = str => this.props.active && this.xterm.findNext(str)
  findPrevious = str => this.props.active && this.xterm.findPrevious(str)

  hideFind = () => this.props.active && this.xterm.focus()

  onBlur = () => this.props.active && this.props.autoFocus && this.xterm.focus()

  render() {
    const { visibile } = this.state

    return (
      <div
        ref={ref => (this.termRef = ref)}
        className={cx(styles.container, { [styles.visibile]: visibile })}
        onBlur={this.onBlur}
      />
    )
  }
}
