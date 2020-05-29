const baseConfig = require('./config.base')

module.exports = {
  publicPath: './',
  css: {
    extract: false
  },
  configureWebpack: {
    ...baseConfig
  },
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('markdown-loader')
      .loader('html-loader')
      .end()
  }
}
