import './common.css'
import Button from './button/index'
import Input from './input/index'
import Element from './element/index'

const components = [Button, Input, Element]
const Lib = {
  install: Vue => {
    components.forEach(vnode => {
      Vue.use(vnode)
    })
  }
}
export default Lib

export { Button, Input, Element }
