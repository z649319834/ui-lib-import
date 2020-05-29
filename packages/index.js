import './style/index.scss'
import { default as Button } from './components/button/index'
import { default as Input } from './components/input/index'
import { default as Element } from './components/element/index'

const components = [Button, Input, Element]
const Lib = {
  install: Vue => {
    components.forEach(vnode => {
      Vue.use(vnode)
    })
  }
}
export default Lib
