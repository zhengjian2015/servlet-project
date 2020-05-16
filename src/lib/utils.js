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

export default utils
