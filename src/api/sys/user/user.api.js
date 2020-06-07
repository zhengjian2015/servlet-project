import {fetch} from '../../../lib/base'

/**
 * 获取用户列表数据
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const queryUserList = params => {
  return fetch('/user/queryUserList', params)
}

// 验证这个账户是否已经创建过
export const checkLoginAccount = params => {
  return fetch('/user/checkLoginAccount', params)
}

// 创建用户
export const createUser = params => {
  return fetch('/user/createUser', params)
}

// 加载所有的角色数据
export const loadAllRole = params => {
  return fetch('/user/loadAllRole', params)
}
