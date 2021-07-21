const { app, BrowserWindow, Notification, ipcMain, } = require('electron')

let win;
let win2;
app.on('ready', ()=> {
    win =new BrowserWindow({
        width:300,
        height:300,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false, //为了安全性 12.0以后
            enableRemoteModule: true, // remote模块 5.0 默认关闭
        },
        // webContents: {
        //     openDevTools: true   //不想要控制台直接把这段删除
        // },
    })
    win.loadURL('https://mathiasbynens.be/demo/img-loading-lazy')
    // win.loadFile('./index.html')
    win.webContents.openDevTools()
    // win2 =new BrowserWindow({
    //     width:300,
    //     height:300,
    //     webPreferences:{
    //         nodeIntegration:true,
    //         contextIsolation: false, 
    //         enableRemoteModule: true,
    //     }
    // })
    // win2.loadFile('./index2.html')
    // win2.webContents.openDevTools()
    // global.winId = {
    //     idd:win2.webContents.id
    // }
    // console.log(global)
    // handleIpc()
    // mainRender()
    // setTimeout(mainRender,1000)
})

function handleIpc() {
    ipcMain.handle('work-notification',async function () {
        let res = await new Promise((resolve,reject)=>{
            let notification = new Notification({
                title:'任务技术',
                body:'是否开始休息',
                action:[{text:'开始休息',typw:'button'}],
                closeButtonText:'继续工作'
            })
            notification.show()
            notification.on('action',()=> {
                resolve('reset')
            })
            notification.on('close',()=> {
                resolve('work')
            }
            )
        })
        return res
    })
}

//渲染到主进程接受
// ipcMain.on('talking',(v)=>{
//     console.log('tttttt')
// })

//主进程到渲染进程
// function mainRender() {
//     console.log(111)
//     win.webContents.send('coming')
// }

//页面间（渲染进程与渲染进程）通信

