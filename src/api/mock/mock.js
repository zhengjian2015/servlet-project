import userLogin from './login/user.login'

const Mock = require('mockjs')

Mock.mock('/user/login', 'post', userLogin)
