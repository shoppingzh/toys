import Component from './main'

Component.install = function(Vue) {
  Vue.component(Component.name, Component)
}

export default Component