import {fetch} from '../../../lib/base'

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
