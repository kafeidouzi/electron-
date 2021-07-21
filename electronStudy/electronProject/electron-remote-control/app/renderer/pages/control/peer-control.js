const EvenEmitter = require('events')
const peer = new EvenEmitter
const { desktopCapturer } = require('electron')
async function getScreenStream () {
    const sources = await desktopCapturer.getSources({types: ['screen']})
    console.log(sources)
    navigator.webkitGetUserMedia({
        audio:false,
        video:{
            mandatory: {
                chromeMediaSource:'desktop',
                chromeMediaSourceId:sources[0].id,
                maxWidth:window.screen.width,
                maxHeight:window.screen.height
            }
        }
    }, 
    // navigator.webkitGetUserMedia({
    //     audio: false,
    //     video: {
    //         mandatory: {
    //             chromeMediaSource: 'desktop',
    //             chromeMediaSourceId: sources[0].id,
    //             maxWidth: window.screen.width,
    //             maxHeight: window.screen.height
    //         }
    //     }
    // }, 
    (stream)=> {
        console.log(stream)
        let video = document.getElementById('screen-video')
        video.srcObject = stream
        video.onloadedmetadata = function () {
            console.log(222)
            video.play()
        }
        // peer.emit('add-stream',stream)
    },(err)=> {
        console.log(err)
    })
}
getScreenStream()


module.exports = peer