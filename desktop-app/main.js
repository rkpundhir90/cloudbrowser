const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: false, // Important for security
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: false,
      webviewTag: true, // Disable CSP restrictions
    },
  })

  // Load a default page, like Google, or your own custom HTML
  //win.loadURL('https://www.google.com')
  win.loadFile('index.html')

  // Open DevTools if you want to debug
  // win.webContents.openDevTools()

  
win.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
  console.error(`Failed to load ${validatedURL}: ${errorDescription} (Code: ${errorCode})`);
});
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
