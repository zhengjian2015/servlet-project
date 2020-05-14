import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

const navLang = navigator.language
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false
let lang = window.localStorage.lang || localLang || 'zh-CN'

Vue.config.lang = lang

Vue.locale = () => {}

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || lang
})

export default i18n
