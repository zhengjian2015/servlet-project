import {getLoginMenuList} from '../../lib/utils'
import router from '../../router/router'

export default {
  state: {
    access: localStorage.getItem('access') ? localStorage.getItem('access') : '',
    menuList: []
  },
  getters: {
    menuList (state, getters, rootState) {
      return getLoginMenuList(router, rootState.user.access)
    }
  },
  mutations: {

  },
  actions: {

  }
}
