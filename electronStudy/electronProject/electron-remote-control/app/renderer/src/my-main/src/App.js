import React, { useEffect, useState }   from 'react'
import logo from './logo.svg';
import './App.css';
// import { ipcRenderer } from 'electron/renderer';

import { ipcRenderer } from 'electron'  // 会报错，两种解决办法 ，第二種修改webpacktarget
// const { ipcRenderer } = window.require('electron') ; //第一种，这样不回去解析electron依赖

function App() {
  const [ remoteCode, setRemoteCode ] = useState('')
  const [ localCode, setLocalCode ] = useState('')
  const [ confirmText,setConfirmText ] = useState('')
  const login = async ()=> {
    let code = await ipcRenderer.invoke('login')
    setLocalCode(code)
  }

  useEffect(()=>{
    login()
    ipcRenderer.on('control-state-change',handleControlState)
    //hook支持返回一个函数,清除掉监听事件
    return () => {
      ipcRenderer.removeListener('control-state-change',handleControlState)
    }
  },[])
  const handleControlState = (e,name,type)=> {
    let text = ''
    if (type === 1) { //控制别人
      text = `正在控制${name}`
    } else if (type === 2) { //被控制
      text = `被${name}控制中`
    }
    setConfirmText(text)
  }
  const startControl = (remoteCode)=> {
    ipcRenderer.send('control',remoteCode)
  }
  return (
    <div className="App">
      {
        confirmText === '' ? <>
          <div>你的控制码为{localCode}</div>
          <input type="text" value={remoteCode}  onChange={e => setRemoteCode(e.target.value)}/>
          <button onClick={()=> startControl(remoteCode)}>确认</button>
        </> : <div>{confirmText}</div>
      }
    </div>
  );
}

export default App;
