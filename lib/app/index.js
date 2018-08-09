import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'emotion'

import App from './components/app'
import './styles'

ReactDOM.render(<App />, document.getElementById('app'))
