export const ZOOM_ACTUAL_SIZE = 'ZOOM_ACTUAL_SIZE'
export const ZOOM_IN = 'ZOOM_IN'
export const ZOOM_OUT = 'ZOOM_OUT'

export const SHOW_FIND = 'SHOW_FIND'
export const HIDE_FIND = 'HIDE_FIND'
export const SET_FIND_VALUE = 'SET_FIND_VALUE'
export const FIND_NEXT = 'FIND_NEXT'
export const FIND_PREVIOUS = 'FIND_PREVIOUS'

export const NEW_TAB = 'NEW_TAB'
export const CLOSE_TAB = 'CLOSE_TAB'
export const SHOW_TAB = 'SHOW_TAB'
export const SHOW_PREVIOUS_TAB = 'SHOW_PREVIOUS_TAB'
export const SHOW_NEXT_TAB = 'SHOW_NEXT_TAB'
export const MOVE_TAB_BACKWARD = 'MOVE_TAB_BACKWARD'
export const MOVE_TAB_FORWARD = 'MOVE_TAB_FORWARD'

export function zoomActualSize() {
  return { type: ZOOM_ACTUAL_SIZE }
}

export function zoomIn() {
  return { type: ZOOM_IN }
}

export function zoomOut() {
  return { type: ZOOM_OUT }
}

export function showFind() {
  return { type: SHOW_FIND }
}

export function hideFind() {
  return { type: HIDE_FIND }
}

export function setFindValue(value) {
  return { type: SET_FIND_VALUE, value }
}

export function findNext() {
  return { type: FIND_NEXT }
}

export function findPrevious() {
  return { type: FIND_PREVIOUS }
}

export function newTab() {
  return { type: NEW_TAB }
}

export function closeTab(id) {
  return { type: CLOSE_TAB, id }
}

export function showTab(id) {
  return { type: SHOW_TAB, id }
}

export function showPreviousTab() {
  return { type: SHOW_PREVIOUS_TAB }
}

export function showNextTab() {
  return { type: SHOW_NEXT_TAB }
}

export function moveTabBackward() {
  return { type: MOVE_TAB_BACKWARD }
}

export function moveTabForward() {
  return { type: MOVE_TAB_FORWARD }
}
