# vue-lib

这是一个构建按需引入配置的 ui 库模版项目,主要目录结构如下：

```
├── build     // packages编译配置文件夹
├── lib       // packages编译后文件夹
├── packages  // 组件源文件夹
└── src       // demo源文件夹
```

### 重点讲一下 build 文件夹:

config.build.js 用于组件构建配置

```
const { resolve, getComponentEntries } = require('./utils')
const pub = require('./config.pub')

module.exports = {
  // 输出的目录
  outputDir: resolve('lib'),
  configureWebpack: {
    // 入口文件配置
    entry: getComponentEntries('packages'),
    // 输出配置，每个组件会通过name值创建文件夹
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'umd',
      libraryExport: 'default',
      library: 'VueLib'
    },
    resolve: pub.resolve
  },
  css: {
    // 建议关闭，减少体积大小
    sourceMap: false,
    // 必须关闭，如果设置为true，在项目中无法通过babel-plugin-import自动引入，所以直接打包在js文件中
    extract: false
  },
  chainWebpack: config => {
    <!-- 删除不必要的配置，都是vue-cli自带的，编译用不到 -->
    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('html')
    config.plugins.delete('hmr')
    config.entryPoints.delete('app')

    // 提取字体文件
    config.module
      .rule('fonts')
      .use('url-loader')
      .tap(option => {
        option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
        return option
      })
  }
}

```

config.dev.js 用于正常的 demo 构建配置，就不做详细说明了

### npm publish

```
{
  "name": "vue-lib-test", // 包名
  "version": "1.0.7",
  "main": "lib/index/index.js", // 主入口文件
  "files": [  // 发布需要上传的文件
    "lib",
    "packages"
  ],
  ...
}
```
