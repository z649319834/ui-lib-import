const { resolve, getComponentEntries } = require('./utils')
const pub = require('./config.pub')

module.exports = {
  outputDir: resolve('lib'),
  configureWebpack: {
    entry: {
      ...getComponentEntries('packages/components'),
      style: resolve('/packages/style/index.scss'),
      index: resolve('/packages/index.js')
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'VueLib'
    },
    resolve: pub.resolve
  },
  css: {
    sourceMap: false,
    extract: {
      filename: '[name]/index.css'
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('html')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')

    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
        return option
      })
  }
}
