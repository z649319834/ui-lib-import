module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vue-lib-test',
        libraryDirectory: 'lib',
        style: name => {
          console.log('>>>>>>', name)
          return `${name}/index.css`
          // return 'css'
        }
      },
      'vue-lib-test'
    ],
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: name => {
          console.log('>>>>>>', name)
          // return `${name}/index.css`
        }
      },
      'ant-design-vue'
    ]
  ]
}
