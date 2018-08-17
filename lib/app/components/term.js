import React, { Component } from 'react'
import _ from 'lodash'
import { css } from 'emotion'
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'

import { dracula } from '../themes'

Terminal.applyAddon(fit)

const styles = {
  container: css`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `
}

export default class Term extends Component {
  constructor() {
    super()
    this.fit = _.debounce(this.fit.bind(this), 20, { leading: true, trailing: true })
  }

  componentDidMount = () => {
    // xterm init
    this.xterm = new Terminal({
      fontFamily: 'Menlo, monospace',
      fontSize: 12,
      experimentalCharAtlas: 'dynamic',
      fontWeight: 'normal',
      fontWeightBold: 'bold',
      rendererType: 'dom',
      allowTransparency: true, // Weird artifacts on resize window without this :/
      theme: dracula
    })
    this.xterm.open(this.termRef)
    window.addEventListener('resize', this.fit, { passive: true })

    // bindings
    this.xterm.on('data', data => this.props.pty.write(data))
    this.props.pty.on('data', data => this.xterm.write(data))
    this.xterm.on('resize', ({ cols, rows }) => this.props.pty.resize(cols, rows))

    setTimeout(() => {
      this.fit()
      this.xterm.focus()
    })
  }

  componentDidUpdate = () => {
    const { active } = this.props
    if (active) this.xterm.focus()
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.fit)
    this.xterm.dispose()
    this.props.pty.kill()
  }

  fit = () => this.xterm.fit()

  render() {
    return <div className={styles.container} ref={ref => (this.termRef = ref)} />
  }
}
