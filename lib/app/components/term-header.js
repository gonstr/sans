import React, { Component } from 'react'
import { cx, css } from 'emotion'

import appstyles from '../styles'
import { parsePwd, parseGit } from '../utils'

const styles = {
  termHeader: css`
    margin-right: -10px;
    padding: 1px;
    color: #f8f8f2;
    flex: 1;
    height: 25px;
    background: hsl(231, 15%, 18%);
    clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%);
  `,
  termHeaderInner: css`
    padding: 0 20px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    direction: rtl;
    background: hsl(231, 15%, 28%);
    clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 100%, 0 100%);
    transition: background 0.1s;
  `,
  termHeaderActive: css`
    background: hsl(231, 15%, 18%);
    z-index: 1;
  `,
  termHeaderInnerActive: css`
    background: hsl(231, 15%, 18%);
  `,
  termHeaderText: css`
    opacity: 0;
    transition: opacity 0.5s;
  `,
  termHeaderTextVisible: css`
    opacity: 1;
  `
}

export default ({ ses, active, visible, onClick }) => (
  <div
    className={cx(styles.termHeader, { [styles.termHeaderActive]: active })}
    key={ses.pty.pid}
    onClick={onClick}>
    <div
      className={cx(styles.termHeaderInner, {
        [styles.termHeaderInnerActive]: active
      })}>
      <span className={cx(styles.termHeaderText, { [styles.termHeaderTextVisible]: visible })}>
        {
          // Hack to get consistency from direction: ltr for cwd ~ and /
          // without this single no word chars break the text direction :?
          <span style={{ visibility: 'hidden', fontSize: '0' }}>'abc'</span>
        }
        <span>{parsePwd(ses.pwd || '')} </span>
        {ses.git && (
          <span>
            <span className={appstyles.cyan}>({parseGit(ses.git)})</span>
          </span>
        )}
        <span className={appstyles.blue}> - </span>
        {ses.cmd || ses.pty.process}
      </span>
    </div>
  </div>
)
