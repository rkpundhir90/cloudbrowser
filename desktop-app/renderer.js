const backBtn = document.getElementById('back')
const forwardBtn = document.getElementById('forward')
const goBtn = document.getElementById('go')
const urlInput = document.getElementById('url')
const browserFrame = document.getElementById('browser')
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  sendMessage: (channel, data) => ipcRenderer.send(channel, data),
  onMessage: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args)),
});

backBtn.addEventListener('click', () => {
  browserFrame.contentWindow.history.back()
})

forwardBtn.addEventListener('click', () => {
  browserFrame.contentWindow.history.forward()
})

goBtn.addEventListener('click', () => {
  const url = urlInput.value
  if (!url.startsWith('http')) {
    browserFrame.src = `http://${url}`
  } else {
    browserFrame.src = url
  }
})
