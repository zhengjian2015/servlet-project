import {fetch} from '../../../lib/base'

/**
 * 实现查询字典数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const queryDictList = params => {
  return fetch('/dict/queryDictList', params)
}

/**
 * 实现更新字典数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const updateDict = params => {
  return fetch('/dict/updateDict', params)
}

/**
 * 实现删除字典数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const deleteDict = params => {
  return fetch('/dict/deleteDict', params)
}

/**
 * 实现新增字典数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const addDict = params => {
  return fetch('/dict/addDict', params)
}

/**
 * 实现验证字典类型和字典编码不能重复
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const checkTypeAndCode = params => {
  return fetch('/dict/checkTypeAndCode', params)
}
