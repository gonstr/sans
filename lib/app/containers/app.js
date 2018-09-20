import { remote, ipcRenderer } from 'electron'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cx, css } from 'emotion'
import _ from 'lodash'
import Mousetrap from 'mousetrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Tab from '../tab'
import appstyles from '../styles'
import Term from './term'
import TabHeader from './tab-header'
import { hideFind, showTab, findNext, setFindValue } from '../actions'

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
    justify-content: space-between;
    background: hsl(231, 15%, 28%);
    height: 35px;
    padding-left: 75px;
    -webkit-app-region: drag;
  `,
  headerFullscreen: css`
    padding-left: 10px;
  `,
  tabs: css`
    display: flex;
    flex: 1;
    height: 35px;
    align-items: flex-end;
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
    white-space: nowrap;
    transition: all 0.1s;
    opacity: 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%);
  `,
  findIcon: css`
    color: hsl(231, 15%, 48%);
  `,
  findVisible: css`
    opacity: 1;
    margin-left: 0;
    padding-left: 15px;
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

class App extends Component {
  componentDidMount = () => {
    const { dispatch } = this.props

    ipcRenderer.on('move', () => (this.moved = true))

    this.mousetrap = new Mousetrap(this.findInputRef)
    this.mousetrap.bind('esc', () => dispatch(hideFind()))
    this.mousetrap.bind('enter', () => dispatch(findNext()))
  }

  componentDidUpdate = prevProps => {
    const { findVisible } = this.props
    if (findVisible && !prevProps.findVisible) this.findInputRef.focus()
  }

  // When we get a move event from main process the moved flag is set to true.
  // When a click bubbles up to the component container, we set the move flag to false.
  // Headers onClick is only responsive if move is false when onClick is triggered.
  // Which means:
  // if a move event is received the next onClick is ignored since the user is moving the window
  appClicked = () => (this.moved = false)
  tabHeaderClicked = tab => {
    if (!this.moved) this.dispatch(showTab(tab.id))
  }

  findValueChanged = ({ target }) => this.props.dispatch(setFindValue(target.value))

  render() {
    const { tabs, activeTab, fullscreen, findValue, findVisible } = this.props

    return (
      <div className={styles.container} onClick={() => this.appClicked()}>
        <div className={cx(styles.header, { [styles.headerFullscreen]: fullscreen })}>
          <div className={styles.tabs}>
            {tabs.map((tab, i) => (
              <TabHeader
                key={tab.id}
                last={i === tabs.length - 1}
                ses={tab.activeSession()}
                active={tab === activeTab}
                onClick={() => this.tabHeaderClicked(tab)}
              />
            ))}
          </div>
          <div className={cx(styles.find, { [styles.findVisible]: findVisible })}>
            <FontAwesomeIcon className={styles.findIcon} icon="search" />
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
        {tabs.map((tab, i) => (
          <div className={cx(styles.term, { [appstyles.hidden]: tab !== activeTab })} key={tab.id}>
            <Term
              pty={tab.activeSession().pty}
              active={tab === activeTab}
              autoFocus={!findVisible}
            />
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ app, tabs }) {
  return {
    fullscreen: app.fullscreen,
    findValue: app.findValue,
    findVisible: app.findVisible,
    tabs: tabs.all,
    activeTab: tabs.active
  }
}

export default connect(mapStateToProps)(App)
