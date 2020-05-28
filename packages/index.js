import './style/index.scss'
import Button from './components/button/index'
import Input from './components/input/index'
import Element from './components/element/index'

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
