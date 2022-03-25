import Vue from 'vue'

const loadModule = require.context('.', true, /index.js$/)
loadModule.keys().forEach(name => {
  const module = loadModule(name).default
  if (!module || typeof module !== 'object' || !module.install) return
  Vue.use(module)
})
