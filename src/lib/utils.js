let utils = {}

utils.title = function (title) {
  title = title || '基础架构'
  window.document.title = title
}

export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

export const getLoginMenuList = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta,
        code: item.code,
        path: item.path
      }
      if (hasChild(item) && showTitleMenuEle(item, access)) {
        obj.children = getLoginMenuList(item.children, access)
      }
      if (showTitleMenuEle(item, access)) {
        res.push(obj)
      }
    }
  })
  return res
}

const showTitleMenuEle = (item, access) => {
  return true
}

export const hasChild = (item) => {
  return item.children !== undefined && item.children.length !== 0
}

/**
 * 功能描述： 获取路由的列表数据
 * @param routers
 */
export const getHomeRoute = routers => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children)
      if (res.name) {
        return res
      }
    } else {
      if (item.name === 'home') {
        homeRoute = item
      }
    }
  }
  return homeRoute
}

/**
 * 功能描述：获取面包屑导航的数据
 * @param routeMetched
 * @param homeRoute
 * @returns {any[]|*|Uint8Array|BigInt64Array|U[]|Float64Array|U[]|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array}
 */
export const getBreadCrumbList = (routeMetched, homeRoute) => {
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hide
  }).map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  if (homeRoute.path !== undefined) {
    return [Object.assign(homeRoute, {to: homeRoute.path}), ...res]
  } else {
    return {...res}
  }
}

export default utils
