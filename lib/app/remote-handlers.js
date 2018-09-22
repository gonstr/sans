import { remote, ipcRenderer } from 'electron'
import _ from 'lodash'

import * as Actions from './actions'
import store from './store'

const win = remote.getCurrentWindow()

ipcRenderer.on('actual-size', () => store.dispatch(Actions.zoomActualSize()))
ipcRenderer.on('zoom-in', () => store.dispatch(Actions.zoomIn()))
ipcRenderer.on('zoom-out', () => store.dispatch(Actions.zoomOut()))

ipcRenderer.on('find', () => store.dispatch(Actions.showFind()))
ipcRenderer.on('find-next', () => store.dispatch(Actions.findNext()))
ipcRenderer.on('find-previous', () => store.dispatch(Actions.findPrevious()))

ipcRenderer.on('new-tab', () => {
  const activeTab = store.getState().tabs.active
  store.dispatch(Actions.newTab(activeTab.ses.pwd))
})
ipcRenderer.on('show-previous-tab', () => store.dispatch(Actions.showPreviousTab()))
ipcRenderer.on('show-next-tab', () => store.dispatch(Actions.showNextTab()))
ipcRenderer.on('move-tab-backward', () => store.dispatch(Actions.moveTabBackward()))
ipcRenderer.on('move-tab-forward', () => store.dispatch(Actions.moveTabForward()))

ipcRenderer.on('close-shell', () => {
  const tabs = store.getState().tabs
  if (tabs.all.length === 1) remote.getCurrentWindow().close()
  else store.dispatch(Actions.closeTab(tabs.active.id))
})

remote.getCurrentWindow().on('enter-full-screen', () => store.dispatch(Actions.enterFullScreen()))
remote.getCurrentWindow().on('leave-full-screen', () => store.dispatch(Actions.leaveFullScreen()))
