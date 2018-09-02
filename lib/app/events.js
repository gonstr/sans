import EventEmitter from 'eventemitter3'

const types = {
  FIND_NEXT: 'FIND_NEXT',
  HIDE_FIND: 'HIDE_FIND'
}

const emitter = new EventEmitter()

export default {
  types,
  emitter
}
