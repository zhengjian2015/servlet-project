<template>
  <div class="hello">
    <a-select defaultValue="zh-CN" style="width: 120px" @change="handleChange">
      <a-select-option value="zh-CN">zh-CN</a-select-option>
      <a-select-option value="zh-TW">zh-TW</a-select-option>
      <a-select-option value="en-US">en-US</a-select-option>
    </a-select>
    <a-button type="primary" @click="showModal">打开model</a-button>
    <a-modal
      :title="ModalText"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <p>{{ModalText}}</p>
    </a-modal>
  </div>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      ModalText: 'xxxxxx',
      visible: false,
      confirmLoading: false,
      msg: '国际化'
    }
  },
  methods: {
    ...mapActions([
      'setUserLanguage'
    ]),
    handleChange (value) {
      this.$i18n.locale = value
      localStorage.setItem('lang', value)
      this.setUserLanguage({userLang: value})
    },
    showModal () {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
