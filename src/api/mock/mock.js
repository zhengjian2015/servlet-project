import userLogin from './login/user.login'

import addDict from './dict/dict.addDict'

import checkTypeAndCode from './dict/dict.checkTypeAndCode'
import updateDict from './dict/dict.updateDict'
import deleteDict from './dict/dict.deleteDict'
import queryDictList from './dict/dict.queryDictList'

import getTreeList from './tree/tree.getTreeList'

import treeAddTree from './tree/tree.addTree'
import treeCheckTreeCode from './tree/tree.checkTreeCode'
import treeGetTreeByTreeId from './tree/tree.getTreeByTreeId'
import treeUpdateTree from './tree/tree.updateTree'
import treeDeleteTree from './tree/tree.deleteTree'
import treeQueryTreeButtonList from './tree/tree.queryTreeButtonList'
import treeAddButton from './tree/tree.addButton'
import treeUpdateButton from './tree/tree.updateButton'
import treeDeleteButton from './tree/tree.deleteButton'

import queryRoleList from './role/role.queryRoleList'
import addRole from './role/role.addRole'
import loadTree from './role/role.loadTree'
import checkRoleCodeAndName from './role/role.checkRoleCodeAndName'
import updateRole from './role/role.updateRole'
import getRoleByRoleId from './role/role.getRoleByRoleId'

import getOrgTree from './org/org.getOrgTree'
import addOrg from './org/org.addOrg'
import updateOrg from './org/org.updateOrg'
import getOrgByOrgId from './org/org.getOrgByOrgId'
import deleteOrg from './org/org.deleteOrg'
import getOrgCascader from './org/org.getOrgCascader'

import queryUserList from './user/user.queryUserList'
import createUser from './user/user.createUser'
import loadAllRole from './user/user.loadAllRole'
import checkLoginAccount from './user/user.checkLoginAccount'
import updateUser from './user/user.updateUser'
import getUserByUserId from './user/user.getUserByUserId'
import deleteUser from './user/user.deleteUser'

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

Mock.mock('/tree/getTreeList', 'post', getTreeList)
Mock.mock('/tree/addTree', 'post', treeAddTree)
Mock.mock('/tree/checkTreeCode', 'post', treeCheckTreeCode)
Mock.mock('/tree/getTreeByTreeId', 'post', treeGetTreeByTreeId)
Mock.mock('/tree/updateTree', 'post', treeUpdateTree)

Mock.mock('/tree/deleteTree', 'post', treeDeleteTree)
Mock.mock('/tree/queryTreeButtonList', 'post', treeQueryTreeButtonList)
Mock.mock('/tree/addButton', 'post', treeAddButton)
Mock.mock('/tree/updateButton', 'post', treeUpdateButton)
Mock.mock('/tree/deleteButton', 'post', treeDeleteButton)

Mock.mock('/role/queryRoleList', 'post', queryRoleList)
Mock.mock('/role/addRole', 'post', addRole)
Mock.mock('/role/loadTree', 'post', loadTree)
Mock.mock('/role/checkRoleCodeAndName', 'post', checkRoleCodeAndName)
Mock.mock('/role/updateRole', 'post', updateRole)
Mock.mock('/role/getRoleByRoleId', 'post', getRoleByRoleId)

Mock.mock('/org/getOrgCascader', 'post', getOrgCascader)
Mock.mock('/org/getOrgTree', 'post', getOrgTree)
Mock.mock('/org/addOrg', 'post', addOrg)
Mock.mock('/org/updateOrg', 'post', updateOrg)
Mock.mock('/org/getOrgByOrgId', 'post', getOrgByOrgId)
Mock.mock('/org/deleteOrg', 'post', deleteOrg)

Mock.mock('/user/queryUserList', 'post', queryUserList)
Mock.mock('/user/deleteUser', 'post', deleteUser)
Mock.mock('/user/getUserByUserId', 'post', getUserByUserId)
Mock.mock('/user/updateUser', 'post', updateUser)
Mock.mock('/user/checkLoginAccount', 'post', checkLoginAccount)
Mock.mock('/user/loadAllRole', 'post', loadAllRole)
Mock.mock('/user/createUser', 'post', createUser)
