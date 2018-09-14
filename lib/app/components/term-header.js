import React, { Component } from 'react'
import { cx, css } from 'emotion'
import path from 'path'
import _ from 'lodash'

import appstyles from '../styles'
import { parseCmd, parsePwd, parseGit } from '../utils'

const styles = {
  termHeader: css`
    margin-right: -10px;
    padding: 1px;
    color: #f8f8f2;
    flex: 1;
    height: 25px;
    max-width: 300px;
    overflow: hidden;
    background: hsl(231, 15%, 18%);
    clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%);
  `,
  termHeaderLast: css`
    margin-right: 0;
  `,
  termHeaderInner: css`
    padding: 0 20px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    overflow: hidden;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    direction: rtl;
    background: hsl(231, 15%, 28%);
    clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%);
  `,
  termHeaderActive: css`
    background: hsl(231, 15%, 18%);
    z-index: 1;
  `,
  termHeaderInnerActive: css`
    background: hsl(231, 15%, 18%);
  `,
  termHeaderInnerText: css`
    transition: opacity 0.1s;
    opacity: 0;
  `,
  termHeaderInnerTextVisible: css`
    opacity: 1;
  `
}

export default class TermHeader extends Component {
  constructor() {
    super()
    this.state = { visible: false }

    // Prevent cmd flickering in the header by adding a small debounce
    this.setCmd = _.debounce(this.setCmd, 50)
  }

  componentDidMount = () => {
    const { ses } = this.props

    ses.on('pwd', this.setPwd)
    ses.on('cmd', this.setCmd)
    ses.on('git', this.setGit)

    this.setState({ visible: true })
  }

  setPwd = pwd => this.setState({ pwd })
  setCmd = cmd => this.setState({ cmd })
  setGit = git => this.setState({ git })

  componentWillUnmount = () => {
    const { ses } = this.props

    ses.removeListener('pwd', this.setPwd)
    ses.removeListener('cmd', this.setCmd)
    ses.removeListener('git', this.setGit)
  }

  render() {
    const { ses, active, onClick, last } = this.props
    const { pwd, cmd, git, visible } = this.state

    // Hack to get consistency from direction: ltr for single non-word characters
    // Need to put this infront and behind sentences that could start or end in things
    // like ~, /, . etc
    const hiddenText = <span style={{ visibility: 'hidden', fontSize: '0' }}>'a'</span>

    return (
      <div
        className={cx(styles.termHeader, {
          [styles.termHeaderActive]: active,
          [styles.termHeaderLast]: last
        })}
        key={ses.pty.pid}
        onClick={onClick}>
        <div
          className={cx(styles.termHeaderInner, {
            [styles.termHeaderInnerActive]: active
          })}>
          <span
            className={cx(styles.termHeaderInnerText, {
              [styles.termHeaderInnerTextVisible]: visible
            })}>
            {hiddenText}
            <span>{parsePwd(pwd || '')} </span>
            {git && (
              <span>
                <span className={appstyles.cyan}>({parseGit(git)})</span>
              </span>
            )}
            <span className={appstyles.blue}> - </span>
            {hiddenText}
            {parseCmd(cmd || ses.pty.shell)}
            {hiddenText}
          </span>
        </div>
      </div>
    )
  }
}
