const React = require('react')
const { Terminal } = require('xterm')
const fit = require('xterm/lib/addons/fit/fit')

const themes = require('../themes')

Terminal.applyAddon(fit)

class Term extends React.Component {
  constructor() {
    super()
    this.fit = this.fit.bind(this)
  }

  componentDidMount = () => {
    // xterm init
    this.xterm = new Terminal({
      fontFamily: 'Menlo, monospace',
      fontSize: 12,
      experimentalCharAtlas: 'dynamic',
      fontWeight: 'normal',
      fontWeightBold: 'bold',
      // rendererType: 'dom',
      // experimentalCharAtlas: 'dynamic',
      allowTransparency: true, // Weird artifacts on resize window without this :/
      theme: themes.dracula
    })
    this.xterm.open(this.termRef)
    window.addEventListener('resize', this.fit, { passive: true })

    // bindings
    this.xterm.on('data', data => this.props.pty.write(data))
    this.props.pty.on('data', data => this.xterm.write(data))
    this.xterm.on('resize', ({ cols, rows }) => this.props.pty.resize(cols, rows))

    setTimeout(() => {
      this.xterm.fit()
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

module.exports = Term
