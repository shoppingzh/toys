import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antdv from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import 'tailwindcss/tailwind.css'
import './styles/index.less'

createApp(App).use(router).use(Antdv).mount('#app')
