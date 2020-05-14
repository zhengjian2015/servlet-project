export default {
  state: {
    userLang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'zh-cn'
  },
  getters: {
    userLang (state, getters, rootState) {
      return rootState.app.userLang
    }
  },
  mutations: {
    setUserLang (state, userLang) {
      state.userLang = userLang
      localStorage.setItem('lang', userLang)
    }
  },
  actions: {
    setUserLanguage ({commit}, {userLang}) {
      commit('setUserLang', userLang)
    }
  }
}
