import Vue from 'vue'
import Router from 'vue-router'
import routers from './router'
import Utils from '../lib/utils'

Vue.use(Router)

const RouterConfig = {
  routes: routers
}

export const router = new Router(RouterConfig)

router.beforeEach((to, from, next) => {
  Utils.title(to.meta.title)
  next()
})
