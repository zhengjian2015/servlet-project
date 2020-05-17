import {getBreadCrumbList, getHomeRoute} from '../../lib/utils'
import router from '../../router/router'

export default {
  state: {
    userLang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh-cn',
    breadCrumbList: localStorage.getItem('breadCrumbList') ? JSON.parse(localStorage.getItem('breadCrumbList')) : [],
    homeRoute: getHomeRoute(router)
  },
  getters: {
    userLang (state, getters, rootState) {
      return rootState.app.userLang
    },
    breadCrumbList (state, getters, rootState) {
      return rootState.app.breadCrumbList
    }
  },
  mutations: {
    setUserLang (state, userLang) {
      state.userLang = userLang
      localStorage.setItem('lang', userLang)
    },
    setBreadCrumbList (state, routeMetched) {
      let breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
      state.breadCrumbList = breadCrumbList
      localStorage.setItem('breadCrumbList', JSON.stringify(breadCrumbList))
    }
  },
  actions: {
    setUserLanguage ({commit}, {userLang}) {
      commit('setUserLang', userLang)
    }
  }
}
