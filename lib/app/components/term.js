import { ipcRenderer } from 'electron'
import React, { Component } from 'react'
import _ from 'lodash'
import { css, cx } from 'emotion'
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'

import { dracula } from '../themes'

Terminal.applyAddon(fit)

const styles = {
  container: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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

    // bindings
    this.xterm.on('data', data => this.props.pty.write(data))
    this.props.pty.on('data', data => this.xterm.write(data))
    this.xterm.on('resize', ({ cols, rows }) => this.props.pty.resize(cols, rows))

    ipcRenderer.on('Clear', this.clear)

    setTimeout(() => {
      this.fit()
      this.xterm.focus()
    })

    setTimeout(() => this.setState({ visibile: true }), 200)
  }

  componentDidUpdate = () => {
    const { active, zoom } = this.props
    if (active) this.xterm.focus()
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
  }

  clear = () => this.props.active && this.xterm.clear()

  fit = () => this.xterm.fit()

  render() {
    const { visibile } = this.state

    return (
      <div
        className={cx(styles.container, { [styles.visibile]: visibile })}
        ref={ref => (this.termRef = ref)}
      />
    )
  }
}
