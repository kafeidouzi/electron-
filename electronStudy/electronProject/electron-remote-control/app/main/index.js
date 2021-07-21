const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
// const  {create : createWindow} = require('./windows/main')
const  {create : createWindow} = require('./windows/control')
const handleIPC = require('./ipc')
const { Stream } = require('stream')
 
let win
app.on('ready', ()=> {
    createWindow()
    handleIPC()
})
