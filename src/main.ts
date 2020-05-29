import Vue from 'vue'
import App from './App.vue'
// import 'vue-lib-test/lib/index/index.css'
// import VueLib from 'vue-lib-test'
// Vue.use(VueLib)

window.Vue = Vue
import 'vue-lib-test/lib/style/index.css'
import { Button, Input } from 'vue-lib-test'
console.log(Button, Input)
Vue.use(Button)
Vue.use(Input)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
