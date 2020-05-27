const devConfig = require('./build/config.dev')
const buildConfig = require('./build/config.build')
const isProd = process.env.NODE_ENV === 'production'

const config = isProd ? buildConfig : devConfig
console.log('>>>>>>', process.env.NODE_ENV, config)
// vue cli 配置 参考:https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE
module.exports = config
