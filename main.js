const {app, BrowserWindow, ipcMain} = require('electron')
const DataFetcher = require('./dataFetcher')

DataFetcher.init()

/**
 * Create an electron window and navigate to the appropriate url (file or web style path)
 * @function createWindow
 */
function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 400,
        height: 800,
        // frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
        },
    })

    let url
    if (process.env.NODE_ENV === 'DEV') {
        url = 'http://localhost:8080/'
    }
    else {
        url = `file://${process.cwd()}/public/index.html`
    }

    // and load the index.html of the app.
    win.loadURL(url)
    // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

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

ipcMain.on('data-request', (event, arg) => {
    let data = DataFetcher.returnCovidData()
    event.reply('data-response', data)
})
