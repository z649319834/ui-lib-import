const { resolve, getComponentEntries } = require('./utils')
const baseConfig = require('./config.base')

module.exports = {
  outputDir: resolve('lib'),
  configureWebpack: {
    entry: {
      ...getComponentEntries('packages/components'),
      index: resolve('packages/index.js'),
      style: resolve('packages/style/index.scss')
    },
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'Lib'
    },
    externals: ['vue'],
    ...baseConfig
  },
  css: {
    sourceMap: true,
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

    // 修改字体文件输出的路径
    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'style/fonts/[name].[hash:8].[ext]'
        return option
      })
    // 修改图片输出的路径
    config.module
      .rule('images')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'style/images/[name].[hash:8].[ext]'
        return option
      })
    // 修改图片输出的路径
    config.module
      .rule('svg')
      .use('file-loader')
      .tap(option => {
        option.name = 'style/images/[name].[hash:8].[ext]'
        return option
      })
  }
}
