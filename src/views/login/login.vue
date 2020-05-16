<template>
  <div class="container">
    <div class="top">
      <div class="header">
        <a href="/">
          <img src="../../assets/info.svg" alt="logo" class="logo">
          <span class="title">基础权限架构系统</span>
        </a>
      </div>
      <div class="desc">
        基础权限架构系统一套可以拿来就用的后端管理系统
      </div>
    </div>
    <div class="main">
      <a-form
        id="formLogin"
        class="user-layout-login"
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
      >
        <a-alert v-if="isLoginError" type="error" message="账户密码错误" showIcon></a-alert>
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="请输入账户名或邮箱地址"
            v-decorator="[
            'loginAccount',
            {rules: [{required: true,message:'账户名称不能为空！'},{max:20,message:'账号长度不能超过20个字符！'}]
            , validateTrigger: 'blur'}
            ]"
          >
            <a-icon slot="prefix" type="user" :style="{color: 'rgba(0,0,0,0)'}"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            type="password"
            placeholder="请输入密码"
            v-decorator="[
            'loginPassword',
            {rules: [{required: true,message:'密码不能为空！'},{max:20,message:'密码长度不能超过20个字符！'}]
            , validateTrigger: 'blur'}
            ]"
          >
            <a-icon slot="prefix" type="lock" :style="{color: 'rgba(0,0,0,0)'}"/>
          </a-input>
        </a-form-item>
        <a-form-item style="margin-top: 24px;">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
          >登陆
          </a-button>
        </a-form-item>

        <div class="user-login-other">
          <span>其他登陆方式</span>
          <a>
            <a-icon class="item-icon" type="ailpay-cirle"></a-icon>
          </a>
          <a>
            <a-icon class="item-icon" type="taobo-cirle"></a-icon>
          </a>
          <a>
            <a-icon class="item-icon" type="weibo-cirle"></a-icon>
          </a>
        </div>
      </a-form>
    </div>
    <div class="footer">
      <div class="links">
        <a href="_self">帮助</a>
        <a href="_self">隐私</a>
        <a href="_self">条款</a>
      </div>
      <div class="copyright">
        lazyBoyL出品
      </div>
    </div>
  </div>
</template>
<script>

import {login} from '@/api/sys/login/login.api'

export default {
  name: 'login',
  data () {
    return {
      form: this.$form.createForm(this),
      isLoginError: false
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(err => {
        console.log('err=>' + err)
        if (!err) {
          login({
            loginAccount: 'admin',
            loginPassword: 'admin'
          }).then(res => {
            console.log('这是请求返回的数据' + JSON.stringify(res))
          })
        } else {
          console.log('表单验证不通过')
        }
      })
    }
  }
}

</script>
<style lang="less" scoped>
  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(../../assets/login.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 33px;
          color: rgba(0, 0, 0, .85);
          font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }

      }

      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, .45);
        margin-top: 12px;
        margin-bottom: 40px;
      }

    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;

      .user-layout-login {
        label {
          font-size: 14px;
        }

        .getCaptcha {
          display: block;
          width: 100%;
          height: 40px;
        }

        .forge-password {
          font-size: 14px;
        }

        button.login-button {
          padding: 0 15px;
          font-size: 16px;
          height: 40px;
          width: 100%;
        }

        .user-login-other {
          text-align: left;
          margin-top: 24px;
          line-height: 22px;

          .item-icon {
            font-size: 24px;
            color: rgba(0, 0, 0, 0.2);
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
              color: #1890ff;
            }
          }

          .register {
            float: right;
          }
        }
      }

    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
      }

      .copyright {
        color: rgba(0, 0, 0, .45);
        font-size: 14px;
      }

    }
  }
</style>
