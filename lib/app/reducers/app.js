import _ from 'lodash'

import * as Actions from '../actions'

const initialState = {
  zoom: 0,
  findVisible: false,
  findValue: '',
  findNextCounter: 0,
  findPreviousCounter: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case Actions.ZOOM_ACTUAL_SIZE:
      return { ...state, zoom: 0 }
    case Actions.ZOOM_IN:
      return { ...state, zoom: Math.min(state.zoom + 1, 15) }
    case Actions.ZOOM_OUT:
      return { ...state, zoom: Math.max(state.zoom - 1, -5) }
    case Actions.SHOW_FIND:
      return { ...state, findVisible: true }
    case Actions.HIDE_FIND:
      return { ...state, findValue: '', findVisible: false }
    case Actions.SET_FIND_VALUE:
      return { ...state, findValue: action.value, findNextCounter: 0, findPreviousCounter: 0 }
    case Actions.FIND_NEXT:
      return { ...state, findNextCounter: state.findNextCounter + 1 }
    case Actions.FIND_PREVIOUS:
      return { ...state, findPreviousCounter: state.findPreviousCounter + 1 }
    default:
      return state
  }
}
