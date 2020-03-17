/*
多个页面都需要 判断 是否 含有token  (需要一个公共状态)
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { setUserToken, getUserToken, delUserToken } from '@/utils/auth.js'
// import * as auth from '@/utils/auth.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 放需要共享的状态
    user: getUserToken()
  },
  mutations: {
    // 修改state中数据的方法
    updataToken (state, payload) {
      state.user = payload.user // 修改token
      setUserToken(state.user) // 修改缓存中的token
    },
    delUser (state) {
      state.user = {} // 删除token
      delUserToken() // 删除缓存中token
    }
  },
  actions: {
  },
  modules: {
  }
})
