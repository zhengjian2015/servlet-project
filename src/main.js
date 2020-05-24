import Vue from 'vue'
import App from './App'
import {router} from './router'
import 'ant-design-vue/dist/antd.css'
import antDesignVue from 'ant-design-vue'
import store from './store'
import i18n from './local'

Vue.use(antDesignVue)

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'mock') {
  require('./api/mock/mock')
}

// 格式化时间全局通用方法
Vue.prototype.formatDate = function (date, fmt) {
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
