module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vue-lib-test',
        style: false
      }
    ]
  ]
}
