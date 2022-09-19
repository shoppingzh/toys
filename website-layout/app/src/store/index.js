import Vue from 'vue'
import Vuex from 'vuex'
import { getPageWidth } from '@/utils/dom'
import * as confApi from '@/api/config'
import * as moduleApi from '@/api/module'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pageWidth: getPageWidth(),
    config: confApi.get(),
    modules: moduleApi.list(),
    activeModuleId: null,
  },
  mutations: {
    SET_CLIENT_WIDTH: (state, value) => {
      state.pageWidth = value
    },
    SET_ACTIVE_MODULE_ID: (state, moduleId) => {
      state.activeModuleId = moduleId
    }
  },
  getters: {
    pageWidth: state => state.pageWidth,
    config: state => state.config,
    modules: state => state.modules,
    mainWidth: state => {
      const conf = state.config
      if (conf.layout === 0) {
        return conf.width
      } else if (conf.layout === 1) {
        return state.pageWidth * 0.75
      }
      return state.pageWidth
    },
    activeModule: state => state.modules.find(o => o.id === state.activeModuleId),
  }
})

window.addEventListener('resize', () => {
  store.commit('SET_CLIENT_WIDTH', getPageWidth())
})

// 监听设置变化，保存设置
store.watch((state) => {
  return state.config
}, (newVal) => {
  confApi.save(newVal)
}, {
  deep: true
})


export default store
