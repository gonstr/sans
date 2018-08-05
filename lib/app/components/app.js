import React, { Component } from 'react'

import Term from './term'

export default class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.header} />
        <div style={styles.term}>
          <Term />
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    height: '35px',
    WebkitAppRegion: 'drag'
  },
  term: {
    position: 'relative',
    flex: 1,
    margin: '0 0 15px 15px'
  }
}
