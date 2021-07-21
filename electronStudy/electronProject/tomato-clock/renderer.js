const { ipcRenderer, remote } =  require('electron')
// const { Timer } =  require('timer.js')

// function startWork() {
//     let workTimer = new Timer({
//         ontick:(ms) => {
//             updateTime(ms)
//         },
//         onend:() => {
//             notification()
//         }
//     })
//     workTimer.start(10)
// }

// function updateTime (ms) {
//     let timerContainer = document.getElementsById('timer-container')
//     let s = (ms/1000).toFixed(0)
//     let ss = s % 60
//     let mm = (s / 60).toFixed(0)
//     timerContainer.innerText = `${mm.toString().padStart(2, 0)}: ${ss.toString().padStart(2, 0)}`
// }

// async function notification() {
//     let res = await ipcRenderer.invoke('work-notification')
//     if( res === 'reset' ) {
//         alert('ddddd')
//     } else if( res === 'work' ){
//         startWork()
//     }
// }

// startWork()
// ipcRenderer.send('talking',33)
// ipcRenderer.on('coming',()=>{
//     console.log('you coming')
//     alert('ddddd')
// })

// 渲染进程通信
// let idObj = remote.getGlobal('winId')
// console.log(idObj)
// let dd = idObj.idd
// console.log(dd)
// ipcRenderer.sendTo(dd,'dodo',1)

//