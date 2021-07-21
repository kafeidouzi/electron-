const { ipcRenderer} =  require('electron')

ipcRenderer.on('dodo',(e,a)=>{
    alert(a)
})