const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
 
let win
function create () {
    win = new BrowserWindow({
        width:600,
        height:300,
        webPreferences: {
            nodeIntegration:true,
            contextIsolation: false, 
            enableRemoteModule: true,
        }
    })
    if (isDev) {
        win.loadURL('http://localhost:3000')
    } else {
        win.loadFile(path.resolve(__dirname,'../renderer/pages/main/index.html'))
    }
}

function send (channel, ...args) {
    win.webContents.send(channel,...args)
}

module.exports = { create, send }