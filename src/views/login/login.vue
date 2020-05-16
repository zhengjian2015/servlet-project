<template>
  <div>
    <a-button type="primary" @click="loginAction">模拟mock请求</a-button>
  </div>
</template>
<script>

import {login} from '@/api/sys/login/login.api'

export default {
  name: 'login',
  methods: {
    loginAction () {
      login({
        loginAccount: 'admin',
        loginPassword: 'admin'
      }).then(res => {
        console.log('这是请求返回的数据' + JSON.stringify(res))
      })
    }
  }
}

</script>
