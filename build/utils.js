const fs = require('fs')
const path = require('path')
const join = path.join
const resolve = dir => path.join(__dirname, '../', dir)

module.exports = {
  // 获取文件绝对路径
  resolve,
  // 获取webpack中入口文件对象entry的文件列表
  /**
   *
   * @param {*} path 需要读取的文件夹路径
   * @return object 返回一个入口文件对象
   */
  getComponentEntries(path) {
    let files = fs.readdirSync(resolve(path))
    const componentEntries = files.reduce((ret, item) => {
      const itemPath = join(path, item)
      const tempPath = resolve(itemPath)
      const isDir = fs.statSync(tempPath).isDirectory()
      if (isDir) {
        // 判断文件夹是否为空
        const dirLength = fs.readdirSync(tempPath)
        if (dirLength.length) {
          ret[item] = join(tempPath, 'index.js')
        }
      } else {
        const [name] = item.split('.')
        ret[name] = tempPath
      }
      return ret
    }, {})
    // console.dir(componentEntries)
    return componentEntries
  }
}
