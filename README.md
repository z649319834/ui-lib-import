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
      library: 'Lib'
    },
    externals: ['vue'], // 排除不需要打包的依赖
    resolve: pub.resolve
  },
  css: {
    // 建议关闭，减少体积大小
    sourceMap: true,
    /**
     设置为true，需要在项目的 babel.config.js 文件中配置 babel-plugin-import 按需加载，公共部分需要自己手动引入。(建议)
     设置为false，直接把css打包在js中，但是公共的样式也会变成js文件，而且需要手动引入
    */
    extract: {
      // css存储的路径和名字
      filename: '[name]/index.css'
    }
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
    // 修改图片｜字体输出的路径,
    config.module
      .rule('svg')
      .use('file-loader')
      .tap(option => {
        option.name = 'style/images/[name].[hash:8].[ext]'
        return option
      })
  }
}

```

config.dev.js 用于正常的开发构建配置，就不做详细说明了

### npm publish

```
{
  "name": "vue-lib-test", // 包名
  "version": "1.0.7",
  "main": "lib/index/index.js", // 主入口文件
  "style": "lib/index/index.css", // 主入口文件样式
  "files": [  // 发布需要上传的文件
    "lib",
    "packages"
  ],
  ...
}
```

### 按需引入

在项目中安装`babel-plugin-import`

```
npm intsall babel-plugin-import -D

or

yarn add babel-plugin-import -D
```

按需引入在项目根目录下新建`babel.config.js`文件

```
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'vue-lib-test',  // 按需引入的npm包
        style: name => `${name}/index.css`   // 根据自己设置的extract打包的路径返回css文件，就是文件可以自动引入，css文件目前没有找到原因，所以需要手动设置
      }
    ]
  ]
}

```

**⚠️ 注意： 如果是全部引入组件包，需要删除以上配置，否则会影响组件包主入口文件的引入**

### Run

```
yarn serve
```

### Build packages

```
yarn build
```

### Build Project

```
yarn build:app
```
