import { ipcRenderer } from 'electron'
import React, { Component } from 'react'
import _ from 'lodash'
import { css, cx } from 'emotion'
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
import Mousetrap from 'mousetrap'

import { dracula } from '../themes'

Terminal.applyAddon(fit)

const styles = {
  container: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    opacity: 0;
  `,
  visibile: css`
    opacity: 1;
  `,
  term: css`
    height: 100%;
  `,
  termFindVisible: css`
    height: calc(100% - 45px);
  `,
  find: css`
    height: 0;
    width: 100%;
    background: hsl(231, 15%, 28%);
  `,
  findVisible: css`
    height: 45px;
  `
}

export default class Term extends Component {
  constructor() {
    super()
    this.fit = _.debounce(this.fit.bind(this), 20, { leading: true, trailing: true })
    this.state = { visibile: false, findVisible: false }
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

    // Keyboard
    ipcRenderer.on('Clear', this.clear)
    ipcRenderer.on('Find...', this.showFind)
    this.mousetrap = new Mousetrap(this.findInputRef)
    this.mousetrap.bind('esc', this.hideFind)

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
    this.mousetrap.reset()

    this.xterm.dispose()
    this.props.pty.kill()
  }

  showFind = () => {
    this.setState({ findVisible: true })
    this.fit()
  }

  hideFind = () => {
    this.setState({ findVisible: false })
    this.fit()
  }

  clear = () => this.props.active && this.xterm.clear()

  fit = () => this.xterm.fit()

  render() {
    const { visibile, findVisible } = this.state

    return (
      <div className={cx(styles.container, { [styles.visibile]: visibile })}>
        <div
          className={cx(styles.term, { [styles.termFindVisible]: findVisible })}
          ref={ref => (this.termRef = ref)}
        />
        <div className={cx(styles.find, { [styles.findVisible]: findVisible })}>
          <input ref={ref => (this.findInputRef = ref)} type="text" />
        </div>
      </div>
    )
  }
}
