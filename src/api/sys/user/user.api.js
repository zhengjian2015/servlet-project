import {fetch} from '../../../lib/base'

/**
 * 获取用户列表数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const queryUserList = params => {
  return fetch('/user/queryUserList', params)
}
