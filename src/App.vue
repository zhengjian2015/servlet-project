<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
