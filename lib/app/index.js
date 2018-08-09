import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'emotion'

import App from './components/app'

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
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: hsl(231, 15%, 28%);
  }
  .cyan {
    color: #8be9fd;
  }
  .blue {
    color: #bd93f9;
  }
  .red {
    color: #ff5555;
  }
  .green {
    color: #50fa7b;
  }
  .bump {
    margin-right: 5px;
  }
  .bump-bg {
    margin-right: 10px;
  }
  .hidden {
    visibility: hidden;
  }
`

ReactDOM.render(<App />, document.getElementById('app'))
