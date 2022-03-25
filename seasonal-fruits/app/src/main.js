import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.less'
import components from '@/components'

createApp(App).use(components).mount('#app')
