### electron到底是什么？？
1. 它是可以使用web技术构建跨平台应用
2. electron = chromium + node.js + native API
        高效：通过web技术写UI   能力：底层能力       能力&体验：跨平台&原生能力
3. electron历史：网景，微软 -》 火狐  谷歌  node  -》 // 不完整

### electron 架构与原理
1. chromium架构  （多进程）
    browser主进程 和多个renderProcess   ，二者需要通过IPC通信 ，
![chromium架构.png](https://upload-images.jianshu.io/upload_images/18473143-85fffb66f84081bb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2. node.js和chromium的整合   
    + 难点： node.js事件循环基于libuv，chromium基于message pump
    + 处理方法有两种：
        1. chromium集成到node.js: 用libuv实现message pump（nw.js）
        2. node.js集成到chromium   electron新起一个线程，去轮询libuv 的fd，一旦有fd则electron转发事件到chromium事件循环，一道而这时间的一个相通
3. 延伸资料：
    + https://electronjs.org/blog/electron-internals-node-integration
    + https://www.youtobe.com/watch?v=OPhb5GoV8XK
    + https://github.com/electron/electron/blob/master/shell/common/node_bingings.cc
### 桌面端技术选型
1. Native (C++/C/Objective-C)  
    + 高性能、原声体验、包体积小、  门槛高，迭代速度慢
2. QT （例如  DropBox，WPS）
    + 基于C++、跨平台（MAC，windows, ios,Android,Linux,嵌入式） 高性能、媲美原声体验、门槛高、迭代速度一般
3. Flutter （太新，不太适合做业务）
    + 跨端（ios，Android，Mac，WINDOWS,Linux,Web）
    + Pc大发展（Mac > Linux /windows） 后两者近乎不可用
    + 基建少
4. NW.js   （微信开发者工具）
    + 跨平台（Mac / Linux /windows）,V0.14.7支持XP（xp市场份额15%） 迭代块，Web技术构建  源码加密，支持Chrome扩展
    + 不错的社区  、包体积大、性能一般
5. electron  (Atom,slack, VS code,WhatsApp,WordPress,大象)
    + 跨平台（Mac / Linux /windows，不支持XP） ，web技术构建 ，活跃的社区，大型应用的案例，包体积大，性能一般

### electron 桌面应用  番茄钟

### electron与web开发不同
1. ***主进程和渲染进程**
    ![主进程和渲染进程常用模块.png](https://upload-images.jianshu.io/upload_images/18473143-82cc8ebf714ed949.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    主进程（20多个）、渲染进程（8个）两个进程都可以使用（4个）
    
### electron控制台
https://github.com/sindresorhus/electron-debug   



### electron进程间通信的目的
1. **通知事件**
2. **数据传输**
3. **共享数据**

### IPC 模块通信
 electron提供了IPC通信模块，主进程的ipcMain和渲染进程的ipcRenderer，二者都是EventEmitter对象

 2. 进程通信，从渲染进程到主进程  
    + ipcRenderer.send(channel,...args)
    + ipcMain.on(channel,handler)
    (2) promise写法(Electron7.0之后，处理请求+响应模式)
    + ipcRenderer.invoke(channel,..args)
    + ipcMain.handle(channel,handler)
3. 进程通信， 从主进程到渲染进程
    + webContents.send(channel)
    + ipcRenderer.on(channel,handle)
4. 页面间的通信（渲染到渲染）
    + 通知事件 
        1. 通过主进程转发（electron5之前）
        2. ipcRenderer.sendTo(electron5之后)
    + 数据共享
        1. web技术  （localStroage，sessionStorage，indexdDB）
        2. 使用remote （不建议使用）
5. 通信经验与技巧
    + 少用remote模块   每次都会出阿发底层ipc时间，特别影响性能
    + 不要用sync
    + 在请求+ 响应的通信模式下，需要自定义超时限制

### electron 的native和原生GUI
1. **使用electron api创建原生GUI**
    + BrowserWindow应用窗口
    + Tray 托盘
    + app设置dock.badge
    + Menu 菜单
    + dialog 原生弹框
    + TouchBar 苹果触控栏
    + 等等。。。。
2. **使用electron api获取底层能力**
    + clipboard 剪贴板
    + globalShortcut 全局快捷键
    + desktopCapture 捕获桌面
    + shell打开文件，URL
    + 等等。。。
3. **使用NODE。js获得底层能力**
    + electron同时在主进程和渲染进程中对node.js暴露了多有的接口
        1. fs进行读写文件
        2. crypto进行加密
    + 通过npm安装即可引入社区上所有的node。js库

### node ffi（Foreign Function Interface） 集成动态库

### 调用OS能力
1. winRT window runtime， 常用库 （https://github.com/NodeRT/NodeRT）
2. Applescript   常用库 ( https://github.com/TooTallNate/node-applescript )
3. shell ( node.js child_process )

### electron能力
![electron能力.png](https://upload-images.jianshu.io/upload_images/18473143-0baa1993e6707607.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###  与web不同，释放前端想象力，基于electron能做什么

1. 无兼容问题 / no polyfill
    + 不用担心safari，IE上的表现差异了
    + 大胆使用chrome浏览器已经支持的api
    + babel中设置了targets为electron对应的chrome版本
2. eg：最新浏览器的feature
    + 纯天然的lazyLoad  （https://mathiasbynens.be/demo/img-loading-lazy）
    + chromium 更新特性   （http://developers.google.com/web/updates）
3. ES6/7/8/9/10高级语法
    + Asyc await /promise
    + string/array/object等高级用法
    + BinInt
4. 无跨域问题
    + 使用node.js发请求
    + 使用electron net发送请求
5. more。。。
    + 操作本地文件
    + 更好用的本地DB （lowDB，levelDB，SQLlite等，并不想浏览器局限于indexDB的web存储）
    + 多线程，多进程

### 远程控制项目分析
1. **角色**
    + 控制端：客服人员、研发人员
    + 傀儡端：用户
2. **流程** ()内关键点分析
    + 傀儡端告知控制端本机控制码
        （建立端与控制码的联系 -> 服务端需求）
    + 控制端输入密码连接傀儡端
        （1. 通过控制码找到用户，2. 建立用户间连接 -> 服务端需求（服务端中转） or 客户端需求（点对点））
    + 傀儡端将不活的画面传至控制端
        （1.捕获画面，播放画面 -> 客户端需求 2. 用户建画面传输 -> 服务端需求/客户端需求）
    + 控制端的鼠标和键盘指令传送至傀儡端
        （1.捕获指令 -> 客户端需求 2.用户间指令传输 -> 服务端需求/客户端需求）
    + 傀儡端响应控制指令
        （响应指令 -> 客户端）

3. 技术关键点 
    + 捕获画面 
        electron desktopCapture
    + 怎么完成用户间连接，画面+指令传输
        webRTC（web real-time communications）（1v1传输）
        1. getUserMadia （获取多媒体数据（视频，音频））
        2. RTCPeerConnection (建立P2P连接，传输多媒体数据)
        3. RTCDataChannel （传输数据）
    + 响应控制指令
        + robotjs（nodejs）c++扩展库，可以实现鼠标划定，键盘输入等效果


### 项目开发注意点
1. wait-on  用来等待资源，文件等准备完毕，再执行后一个命令
2. concurrently  并行执行命令
3. 在前端文件中直接引用 import { ipcRenderer } from 'electron'   会报错，**两种方法解决**，
    + const { ipcRenderer } = window.require('electron')
    + 使用 customize-cra，和react-app-rewired   修改webpack的target

### 其他模板
1. electron-react-boilerplate
2. electron-vue
3. svelte-template-electron  国外很火，代码简洁
4. abgule-electron

### 业务原型分析
1. 获取自身控制码
2. 发起控制： 文本框 + 确认按钮
3. 连接状态： 未连接，正在控制屏幕，屏幕被控制中
4. 确认按钮点击后创建控制屏幕窗口

### api区分
1. ipcRenderer.invoke(),主要用于服务器请求这类发送,需要等待的
    ipcRenderer.send(),这个不需要等待的


### webRTC  （傀儡端实现）
1. **getUserMedia   获取桌面的视频流**
    + 媒体内容的流
    + 一个流对象可以包含多轨道，包括音频和视频轨道等
    + 能通过WebRTC传输 （官方有图片助于理解）
    + 通过<video>标签可以播放
2. 如何捕获媒体流
    + navigator.mediaDevices.getUserMedia(MediaStreamConstraints)
        **返回：**promise，成功后resolve回调一个MediaStream实例对象
        **参数：**MediaStreamConstraints
    + audio  :Boolean | MediaTrackConstraints  // 视频会议直接设置为true即可
    + video  :Boolean | MediaTrackConstraints
        **width**  分辨率
        **height** 分辨率
        **frameRate**  帧率，（比如｛ideal:10,max:15｝）
    + 捕获音频视频媒体流
    ```
    navigator.mediaDevices.getUserMedia({
        audio:true,
        video: {
            width: { min:1024,ideal:1280,max:1920 },
            height: { min:576,ideal:720,max:1080 },
            frameRate:{ max:30 }
        }
    })
    ```
    + 如何播放视频流
    ```
    var video = document.querySelector('video')
    video.srcObject = stream
    video.onloadedmetadata = function (e) {
        video.play()
    }
    ```

    + 浏览器上
    ```
    navigator.mediaDevices.getUserMedia({
    //  audio:true,
        video: {
            width: { min:1024,ideal:1280,max:1920 },
            height: { min:576,ideal:720,max:1080 },
            frameRate:{ max:30 }
        }
        }).then((stream)=>{
    console.log(stream)
    var video = document.getElementById('video1')
        video.srcObject = stream
        video.onloadedmetadata = function (e) {
            video.play()
        }

    })
    ```
3. **如何捕获桌面/窗口流**
    + desktopCapturer.getSources({type:['window','screen']}) 提取 chromeMediaSourceId
        1. electron < 5.0是callback调用
        2. 5.0后是promise，返回的是 chromeMediaSources
    + 通过navigator.webkitGetUserMedia({
        audio:false,
        video: {
            mandatory: {
                chromeMediaSources:'desktop',
                chromeMediaSourceId,
                width,
                height
            }
        }
    })

### 如何接受&响应指令
1. robotjs介绍 
    + 用于控制鼠标键盘
    + Nodejs，C++，add-on库 （基于c++实现的node  add-on）
    + 支持Mac，Windows，Linux
2. 安装和使用
    + 安装: npm install robotjs
    + 鼠标移动：robot.moveMouse(x,y)
    + 鼠标点击：mouseClick([button],[double])  左键右键，单机双击
    + 按键：robot.keyTap(KEY,[modifier])  key健值 modifier修饰符（eg：ctrl，shift等）
    + 详细文档：https://robotji.io/docs/syntax
    +   npm install -g windows-build-tools
        npm install -g node-gyp
        npm install robotjs
    + 安装完成，需要进行编译（两种方法）
        1. 手动编译
            npm rebuild __runtime=electron --disturl=http://atom.io/download/atom-shell\ --target=<electron版本> --abi=<对应abi版本>
            process。version.electron  查看electron版本
            process.version.node 可以看到node版本，之後再abi_crosswalk 查看对应abi
        2. electron-rebuild
            + npm i electron-rebuild -D
            + npx electron-rebuild
    + 监听键盘和鼠标时间
