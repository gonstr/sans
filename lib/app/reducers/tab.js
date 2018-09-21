import _ from 'lodash'

import id from '../../common/id'
import Session from '../session'
import * as Actions from '../actions'

// direction = row|col
function split(tab, direction) {
  const active = tab.activeNode

  if (!active.parent) {
  } else if (active.parent && active.parent.type === direction) {
    // Parent node is already a of the right type, so just add a new session node to it
    active.parent.data.push({
      id: id(20),
      type: 'ses',
      parent: active,
      data: new Session(pwd)
    })
  } else {
    // Parent node is not of the right type , so lets convert this node in to a row
    activeNode.type === direction
    activeNode.obj = [activeNode.obj, this.createSessionNode(activeNode.obj.pty.pwd, activeNode)]
  }

  return {}
}

export default function(state, action) {
  switch (action.type) {
    case Actions.SPLIT_SESSION_HORIZONTALLY:
      return split(state, 'row')
    case Actions.SPLIT_SESSION_VERTICALLY:
      return split(state, 'col')
    default:
      return state
  }
}
