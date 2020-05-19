import userLogin from './login/user.login'

import addDict from './dict/dict.addDict'

import checkTypeAndCode from './dict/dict.checkTypeAndCode'
import updateDict from './dict/dict.updateDict'
import deleteDict from './dict/dict.deleteDict'
import queryDictList from './dict/dict.queryDictList'

const Mock = require('mockjs')

/**
 * 2. Mock.mock( rurl, template )
 记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。
 */

Mock.mock('/user/login', 'post', userLogin)

Mock.mock('/dict/addDict', 'post', addDict)

Mock.mock('/dict/checkTypeAndCode', 'post', checkTypeAndCode)
Mock.mock('/dict/updateDict', 'post', updateDict)
Mock.mock('/dict/deleteDict', 'post', deleteDict)
Mock.mock('/dict/queryDictList', 'post', queryDictList)
