// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import antDesignVue from 'ant-design-vue'
import store from './store'
import i18n from './local'

Vue.use(antDesignVue)

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'mock') {
  require('./api/mock/mock')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
