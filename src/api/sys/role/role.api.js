import {fetch} from '../../../lib/base'

/**
 * 实现查询角色列表的数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const queryRoleList = params => {
  return fetch('/role/queryRoleList', params)
}

/**
 * 加载菜单和按钮节点的数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const loadTree = params => {
  return fetch('/role/loadTree', params)
}

/**
 * 新增角色
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const addRole = params => {
  return fetch('/role/addRole', params)
}

/**
 * 验证角色编码和教师名称是否重复
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const checkRoleCodeAndName = params => {
  return fetch('/role/checkRoleCodeAndName', params)
}
