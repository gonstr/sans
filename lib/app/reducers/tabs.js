import _ from 'lodash'

import id from '../../common/id'
import * as Actions from '../actions'
import Session from '../session'

const activeTabIndex = state => state.all.indexOf(state.active)

function newTab(state, action) {
  const activeIndex = activeTabIndex(state)
  const tab = { id: id(20), ses: new Session(action.pwd) }
  const copy = state.all.slice()
  copy.splice(activeIndex + 1, 0, tab)
  return { ...state, all: copy, active: tab }
}

function closeTab(state, action) {
  const activeIndex = activeTabIndex(state)
  const newTabs = state.all.filter(tab => tab.id !== action.id)
  return {
    ...state,
    all: newTabs,
    active: newTabs[activeIndex === 0 ? 0 : activeIndex - 1]
  }
}

function showPreviousTab(state, action) {
  const activeIndex = activeTabIndex(state)
  return {
    ...state,
    active: state.all[activeIndex === 0 ? state.all.length - 1 : activeIndex - 1]
  }
}

function showNextTab(state, action) {
  const activeIndex = activeTabIndex(state)
  return {
    ...state,
    active: state.all[activeIndex < state.all.length - 1 ? activeIndex + 1 : 0]
  }
}

function moveTabBackward(state, action) {
  const activeIndex = activeTabIndex(state)
  if (activeIndex > 0) {
    const copy = state.all.slice()
    copy.splice(activeIndex - 1, 0, copy.splice(activeIndex, 1)[0])
    return { ...state, all: copy }
  } else return state
}

function moveTabForward(state, action) {
  const activeIndex = activeTabIndex(state)
  if (activeIndex < state.all.length - 1) {
    const copy = state.all.slice()
    copy.splice(activeIndex + 1, 0, copy.splice(activeIndex, 1)[0])
    return { ...state, all: copy }
  } else return state
}

const initialTab = { id: id(20), ses: new Session() }
const initialState = {
  all: [initialTab],
  active: initialTab
}

export default function(state = initialState, action) {
  switch (action.type) {
    case Actions.NEW_TAB:
      return newTab(state, action)
    case Actions.CLOSE_TAB:
      return closeTab(state, action)
    case Actions.SHOW_TAB:
      return { ...state, active: _.find(state.all, { id: action.id }) }
    case Actions.SHOW_PREVIOUS_TAB:
      return showPreviousTab(state, action)
    case Actions.SHOW_NEXT_TAB:
      return showNextTab(state, action)
    case Actions.MOVE_TAB_BACKWARD:
      return moveTabBackward(state, action)
    case Actions.MOVE_TAB_FORWARD:
      return moveTabForward(state, action)
    default:
      return state
  }
}
