<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import zhTW from 'ant-design-vue/lib/locale-provider/zh_TW'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'

export default {
  name: 'App',
  data () {
    return {
      locale: zhCN
    }
  },
  watch: {
    userLang (newVal, oldVal) {
      if (newVal === 'zh-CN') {
        this.locale = zhCN
      } else if (newVal === 'zh-TW') {
        this.locale = zhTW
      } else {
        this.locale = enUS
      }
    }
  },
  computed: {
    userLang () {
      return this.$store.getters.userLang
    }
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>
