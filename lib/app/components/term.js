import React, { Component } from 'react'
const pty = require('node-pty')
const { Terminal } = require('xterm')
const fit = require('xterm/lib/addons/fit/fit')
const locale = require('os-locale')

const themes = require('../themes')
const { name, version } = require('../../../package')

Terminal.applyAddon(fit)

export default class Term extends Component {
  constructor() {
    super()
    this.fit = this.fit.bind(this)
  }

  componentDidMount() {
    // node-pty init
    const env = Object.assign(
      {
        LANG: locale.sync() + '.UTF-8'
      },
      process.env,
      {
        TERM: 'xterm-256color',
        COLORTERM: 'truecolor',
        TERM_PROGRAM: name,
        TERM_PROGRAM_VERSION: version
      }
    )

    // https://github.com/zeit/hyper/issues/696
    if (env.GOOGLE_API_KEY && process.env.GOOGLE_API_KEY === env.GOOGLE_API_KEY) {
      delete baseEnv.GOOGLE_API_KEY
    }

    this.shell = pty.spawn('bash', ['--login'], {
      name: 'xterm-color',
      cols: 100,
      rows: 40,
      cwd: this.props.cwd || process.cwd(),
      env
    })

    // xterm init
    this.xterm = new Terminal({
      fontFamily: 'Monaco, monospace',
      fontSize: 12,
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
    this.xterm.on('data', data => this.shell.write(data))
    this.shell.on('data', data => this.xterm.write(data))
    this.xterm.on('resize', ({ cols, rows }) => this.shell.resize(cols, rows))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.fit)
    this.xterm.dispose()
    this.shell.kill()
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
