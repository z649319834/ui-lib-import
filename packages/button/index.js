import model from './button.vue'

model.install = Vue => {
  Vue.component(model.name, model)
}
export default model
