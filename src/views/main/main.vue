<template>
  <a-layout class="bg-main">
    <a-layout-header :trigger="null" collapsible v-model="collapsed">
      <div class="logo">
        <a href="/#/login">
          <img src="../../assets/info.svg" alt="logo">
          <span>基础权限架构</span>
        </a>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
          @click="handleClick"
        >
          <template v-for="item in menuList">
            <a-sub-menu :key="item.name">
              <span slot="title">
                <a-icon :type="item.meta.icon"></a-icon>
                <span>{{item.meta.title}}</span>
              </span>
              <template v-for="childrenItem in item.children">
                <a-menu-item :key="childrenItem.name">
                  <a-icon :type="childrenItem.meta.icon"></a-icon>
                  <span>{{childrenItem.meta.title}}</span>
                </a-menu-item>
              </template>
            </a-sub-menu>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>
            <a-icon type="home">
            </a-icon>
            首页
          </a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff',  minHeight: '280px' }"
        >
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data () {
    return {
      collapsed: false,
      openKeys: []
    }
  },
  methods: {
    handleClick (e) {
      this.$router.push({
        name: e.key
      }).catch(err => {
        console.log('err=>', err)
      })
    }
  },
  computed: {
    menuList () {
      console.log('this.$store.getters.menuList=>' + this.$store.getters.menuList)
      return this.$store.getters.menuList
    }
  }
}
</script>

<style>
  .bg-main {
    height: 100%;
  }

  .bg-main .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .bg-main .trigger:hover {
    color: #1890ff;
  }

  .bg-main .logo {
    position: relative;
    height: 64px;
    padding-left: 24px;
    overflow: hidden;
    line-height: 64px;
    background: #002140;
    -webkit-transition: all .3s;
    transition: all .3s;
    display: block;
  }

  .bg-main .logo img {
    height: 32px;
    width: 32px;
    display: inline-block;
    vertical-align: middle;
  }

  .bg-main .logo sapn {
    color: #fff;
    font-size: 20px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
  }
</style>
