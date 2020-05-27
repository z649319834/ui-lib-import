import model from './input.vue'
model.install = Vue => {
  Vue.component(model.name, model)
}
export default model
