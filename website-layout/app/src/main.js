import Vue from 'vue'
import App from './App.vue'

// plugins
import '@/plugins/element-ui'

import '@/components'
import '@/styles/index.scss'
import store from  '@/store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
