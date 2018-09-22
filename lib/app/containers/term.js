import { ipcRenderer } from 'electron'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { css, cx } from 'emotion'
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
import * as search from 'xterm/lib/addons/search/search'

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

class Term extends Component {
  constructor() {
    super()
    this.onResize = _.debounce(this.onResize.bind(this), 20, { leading: true, trailing: true })
    this.state = { visibile: false }
  }

  componentDidMount = () => {
    this.xterm = new Terminal({
      fontFamily: 'Menlo, monospace',
      fontSize: 12,
      fontWeight: 'normal',
      fontWeightBold: 'bold',
      allowTransparency: true, // Weird artifacts on resize window without this
      theme: dracula
    })

    this.xterm.open(this.termRef)

    // pty/xterm bindings
    this.xterm.on('data', data => this.props.pty.write(data))
    this.props.pty.on('data', data => this.xterm.write(data))
    this.xterm.on('resize', ({ cols, rows }) => this.props.pty.resize(cols, rows))

    window.addEventListener('resize', this.onResize, { passive: true })

    ipcRenderer.on('clear', this.clear)

    setTimeout(() => {
      this.xterm.fit()
      this.xterm.focus()
    })

    this.setState({ visibile: true })
  }

  componentDidUpdate = prevProps => {
    const {
      active,
      findVisible,
      findValue,
      findNextCounter,
      findPreviousCounter,
      zoom
    } = this.props

    if (active) {
      if (!prevProps.active) {
        this.xterm.fit()
        this.xterm.focus()
      }

      if (!findVisible && prevProps.findVisible) this.xterm.focus()

      if (findNextCounter !== prevProps.findNextCounter) this.xterm.findNext(findValue)
      if (findPreviousCounter !== prevProps.findPreviousCounter) this.xterm.findPrevious(findValue)
    }

    const fontSize = 12 + zoom
    if (this.xterm.getOption('fontSize') !== fontSize) {
      this.xterm.setOption('fontSize', fontSize)
      this.xterm.fit()
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.fit)
    ipcRenderer.removeListener('clear', this.clear)

    this.xterm.dispose()
    this.props.pty.kill()
  }

  clear = () => this.props.active && this.xterm.clear()

  onBlur = () => this.props.active && this.props.autoFocus && this.xterm.focus()
  onResize = () => this.props.active && this.xterm.fit()

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

function mapStateToProps({ app }) {
  return {
    findValue: app.findValue,
    findVisible: app.findVisible,
    findNextCounter: app.findNextCounter,
    findPreviousCounter: app.findPreviousCounter,
    zoom: app.zoom
  }
}

export default connect(mapStateToProps)(Term)
