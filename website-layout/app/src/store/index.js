import Vue from 'vue'
import Vuex from 'vuex'
import { getPageWidth } from '@/utils/dom'
import * as confApi from '@/api/config'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pageWidth: getPageWidth(),
    config: confApi.get()
  },
  mutations: {
    SET_CLIENT_WIDTH: (state, value) => {
      state.pageWidth = value
    }
  },
  getters: {
    config: state => state.config,
    mainWidth: state => {
      const conf = state.config
      if (conf.layout === 0) {
        return conf.width
      } else if (conf.layout === 1) {
        return state.pageWidth * 0.75
      }
      return state.pageWidth
    }

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
