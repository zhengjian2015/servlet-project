import userLogin from './login/user.login'

import addDict from './dict/dict.addDict'

const Mock = require('mockjs')

Mock.mock('/user/login', 'post', userLogin)

Mock.mock('/dict/addDict', 'post', addDict)
