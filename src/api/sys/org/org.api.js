import {fetch} from '../../../lib/base'

/**
 * 功能描述： 根据菜单ID来获取菜单数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getOrgByOrgId = params => {
  return fetch('/org/getOrgByOrgId', params)
}

/**
 * 功能描述： 更新组织树
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const updateOrg = params => {
  return fetch('/org/updateOrg', params)
}

/**
 * 功能描述： 获取左侧组织菜单树
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getOrgTree = params => {
  return fetch('/org/getOrgTree', params)
}

/**
 * 功能描述： 验证组织的编码和名称是否存在
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const checkOrgNameAndCode = params => {
  return fetch('/org/checkOrgNameAndCode', params)
}

/**
 * 功能描述： 新增组织
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const addOrg = params => {
  return fetch('/org/addOrg', params)
}
