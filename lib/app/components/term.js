import React, { Component } from 'react'
const { Terminal } = require('xterm')
const fit = require('xterm/lib/addons/fit/fit')

import themes from '../themes'

Terminal.applyAddon(fit)

export default class Term extends Component {
  constructor() {
    super()
    this.fit = this.fit.bind(this)
  }

  componentDidMount() {
    // xterm init
    this.xterm = new Terminal({
      fontFamily: 'Monaco, monospace',
      fontSize: 11,
      //rendererType: 'dom',
      //experimentalCharAtlas: 'dynamic',
      allowTransparency: true,
      theme: themes.dracula
    })
    this.xterm.open(this.termRef)
    window.addEventListener('resize', this.fit)
    this.xterm.fit()
    this.xterm.focus()

    // bindings
    this.xterm.on('data', data => this.props.pty.write(data))
    this.props.pty.on('data', data => this.xterm.write(data))
    this.xterm.on('resize', ({ cols, rows }) => this.props.pty.resize(cols, rows))
  }

  componentDidUpdate() {
    const { active } = this.props
    if (active) this.xterm.focus()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fit)
    this.xterm.dispose()
    this.props.pty.kill()
  }

  fit() {
    this.xterm.fit()
  }

  render() {
    return <div style={styles.container} ref={ref => (this.termRef = ref)} />
  }
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
}
