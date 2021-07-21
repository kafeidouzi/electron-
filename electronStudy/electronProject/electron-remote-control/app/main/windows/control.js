const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
 
let win
function create () {
    win = new BrowserWindow({
        width:1000,
        height:600,
        webPreferences: {
            nodeIntegration:true,
            contextIsolation: false, 
            enableRemoteModule: true,
        }
    })
    // if (isDev) {
    //     win.loadURL('http://localhost:3000')
    // } else {
    //     win.loadFile(path.resolve(__dirname,'../renderer/pages/control/index.html'))
    // }
    win.loadFile(path.resolve(__dirname,'../../renderer/pages/control/index.html'))
    win.webContents.openDevTools()
}
module.exports = { create }