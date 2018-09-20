import { combineReducers } from 'redux'

import app from './app'
import tabs from './tabs'

const rootReducer = combineReducers({
  app,
  tabs
})

export default rootReducer
