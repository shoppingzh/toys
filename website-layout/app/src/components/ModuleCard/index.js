import ModuleCard from './main'

ModuleCard.install = function(Vue) {
  Vue.component(ModuleCard.name, ModuleCard)
}

export default ModuleCard