import EventEmitter from 'eventemitter3'

const types = {
  FIND_NEXT: 'FIND_NEXT',
  FIND_PREVIOUS: 'FIND_PREVIOUS',
  HIDE_FIND: 'HIDE_FIND'
}

const emitter = new EventEmitter()

export default {
  types,
  emitter
}
