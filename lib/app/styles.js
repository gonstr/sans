import { injectGlobal, css } from 'emotion'

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Menlo, Monaco, monospace;
    font-size: 11px;
    background: #282a36;
    margin: 0;
  }
  .xterm {
    font-feature-settings: "liga" 0;
    user-select: none;
    padding: 0 0 10px 10px;
    margin-right: 5px;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: hsl(231, 15%, 28%);
  }
`

const styles = {
  cyan: css`
    color: #8be9fd;
  `,
  blue: css`
    color: #bd93f9;
  `,
  red: css`
    color: #ff5555;
  `,
  green: css`
    color: #50fa7b;
  `,
  bump: css`
    margin-right: 5px;
  `,
  bumpBg: css`
    margin-right: 10px;
  `,
  hidden: css`
    visibility: hidden;
  `,
  faded: css`
    opacity 0;
  `
}

export default styles
