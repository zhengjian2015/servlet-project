import {fetch} from '../../../lib/base'

/**
 * 新增按钮节点
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const addButton = params => {
  return fetch('/tree/addButton', params);
}

/**
 * 根据菜单节点来获取菜单底下的按钮数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const queryTreeButtonList = params => {
  return fetch('/tree/queryTreeButtonList', params)
}
/**
 * 根据菜单节点ID来删除菜单数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const deleteTree = params => {
  return fetch('/tree/deleteTree', params)
}

/**
 * 根据菜单节点ID来获取菜单数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getTreeByTreeId = params => {
  return fetch('/tree/getTreeByTreeId', params)
}

/**
 * 实现更新菜单
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const updateTree = params => {
  return fetch('/tree/updateTree', params)
}

/**
 * 实现新增菜单
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const addTree = params => {
  return fetch('/tree/addTree', params)
}

/**
 * 实现验证菜单编码是否重复
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const checkTreeCode = params => {
  return fetch('/tree/checkTreeCode', params)
}

/**
 * 实现获取菜单树
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getTreeList = params => {
  return fetch('/tree/getTreeList', params)
}
