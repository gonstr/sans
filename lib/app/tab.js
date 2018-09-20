import os from 'os'
import _ from 'lodash'

import Session from './session'
import id from '../common/id'

export default class Tab {
  constructor(pwd = os.homedir()) {
    this.id = id(20)
    this.nodes = this.createSessionNode(pwd)
  }

  createSessionNode(pwd, parent) {
    return {
      type: 'ses',
      obj: new Session(pwd),
      active: true,
      parent
    }
  }

  close() {
    this.sessionNodes().forEach(ses => ses.close())
  }

  sessionNodes() {
    const flatten = (node, acc) => {
      if (node.type === 'ses') {
        acc.push(node)
        return acc
      } else return node.obj.map(n => flatten(n, acc))
    }

    return flatten(this.nodes, [])
  }

  findActiveSessionNode() {
    return _.find(this.sessionNodes(), { active: true })
  }

  activeSession() {
    return this.findActiveSessionNode().obj
  }

  // Direction should be 'row' or 'col'
  split(direction) {
    const activeNode = this.findActiveSessionNode()

    // The old active node will no longer be the active one
    activeNode.active = false

    if (activeNode.parent && activeNode.parent.type === direction) {
      // Parent node is already a row, so just add a new session node to it
      activeNode.parent.obj.push(this.createSessionNode(activeNode.obj.pty.pwd, activeNode))
    } else {
      // Parent node is not a row, so lets convert this node in to a row
      activeNode.type === direction
      activeNode.obj = [activeNode.obj, this.createSessionNode(activeNode.obj.pty.pwd, activeNode)]
    }
  }

  splitHorizontally() {
    split('row')
  }

  splitVertically() {
    split('col')
  }
}
