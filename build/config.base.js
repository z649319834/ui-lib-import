const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')
const utils = require('./utils')

module.exports = {
  resolve: {
    // 为了使用npm link 调试本地项目，所以需要禁用掉该规则。避免追踪软连接实际地址
    // https://github.com/webpack/webpack/issues/811#issuecomment-309797397
    symlinks: false,
    extensions: ['.js', '.vue', '.json'],
    alias: {
      src: utils.resolve('./src'),
      packages: utils.resolve('./packages')
    }
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: Math.floor(Math.random() * 9999 + 1000),
      openAnalyzer: true
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        // Sentry需要上传map文件，所以这里必须设置为true
        sourceMap: true,
        // 默认配置不支持ts文件，所以这里修改了正则
        test: /\.(j|t)s(\?.*)?$/i,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    ]
  }
}
