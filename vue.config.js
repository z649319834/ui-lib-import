const devConfig = require('./build/config.dev')
const buildConfig = require('./build/config.build')
const isProd = process.env.NODE_ENV === 'build'

// 根据环境判断 webpack 配置
const config = isProd ? buildConfig : devConfig
console.log('>>>>>>', process.env.NODE_ENV, config)

module.exports = config
