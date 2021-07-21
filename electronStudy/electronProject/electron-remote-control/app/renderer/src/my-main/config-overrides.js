const { override} = require('customize-cra')  // 不inject去修改webpack配置

function addRendererTarget (config) {
    config.target = 'electron-renderer'
    return config
}

module.exports = override(addRendererTarget)