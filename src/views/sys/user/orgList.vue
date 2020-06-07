<template>
  <a-card title="组织管理">
    <a-row :gutter="24">
      <a-col :span="5">
        <a-card :bordered="true" style="min-height: calc(100vh - 274px);">
          <a-button-group>
            <a-button type="primary" size="small" @click="handleAdd">
              新增
            </a-button>
            <a-button type="primary" size="small" @click="handleUpdate">
              修改
            </a-button>
            <a-button type="primary" size="small" @click="handleDelete">
              删除
            </a-button>
          </a-button-group>
          <a-input-search style="margin-left: 10px;margin-top:5px; width: 144px;" size="small" placeholder="请输入组织" @change="onSearchChange"/>
          <a-tree
            v-if="orgData.length"
            :expandedKeys="expandedKeys"
            :autoExpandParent="autoExpandParent"
            :treeData="orgData"
            @expand="onExpand"
            @select="onSelectChange"
          >
            <template slot="title" slot-scope="{title}">
               <span v-if="title.indexOf(searchValue) > -1">
                {{title.substr(0, title.indexOf(searchValue))}}
              <span style="color: #f50">{{searchValue}}</span>
                {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
              </span>
              <span v-else>{{title}}</span>
            </template>
          </a-tree>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card :title="userListTitle" :bordered="true" style="min-height: calc(100vh - 274px);">
          <div>
            <div style="display: inline-block;">
              <a-button type="primary" @click="handleAddUser">
                +创建用户
              </a-button>
            </div>
            <div style="display: inline-block;float: right;">
              <a-input-search placeholder="请输入用户的账号或者姓名" style="width: 200px" @search="onSearch"/>
            </div>
            <div style="margin-top: 20px;">
              <a-table
                :columns="columns"
                :dataSource="userData"
                :pagination="pagination"
                bordered
                :rowKey="record => record.userId"
                :loading="loading"
              >
              </a-table>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <updateOrg v-model="updateOrgShow" :orgId="orgId" v-on:operateOrgUpdate="operateOrgUpdate"></updateOrg>
    <addOrg v-model="addOrgShow" :parentOrgId="parentOrgId" :parentOrgName="parentOrgName" v-on:operateOrgAdd="operateOrgAdd"></addOrg>
    <addUser v-model="addUserShow" v-on:handleSearch="handleSearch"></addUser>
  </a-card>
</template>
<script>
import {getOrgTree, deleteOrg} from '../../../api/sys/org/org.api'
import addOrg from './addOrg'
import updateOrg from './updateOrg'
import {queryUserList} from '../../../api/sys/user/user.api.js'
import addUser from './addUser'

export default {
  name: 'orgList',
  components: {
    addOrg,
    updateOrg,
    addUser
  },
  data () {
    return {
      userListTitle: '用户管理',
      orgData: [],
      autoExpandParent: false,
      searchValue: '',
      expandedKeys: [],
      nowExpandKeys: [],
      addOrgShow: false,
      hasChildren: false,
      orgId: 1,
      parentOrgId: 0,
      parentOrgName: '虚拟顶级组织',
      updateOrgShow: false,
      userData: [],
      pagination: {
        total: 0,
        showSizeChanger: true
      },
      queryForm: {
        search: '',
        current: 1,
        pageSize: 10,
        key: '',
        order: '',
        fullPath: ''
      },
      loading: false,
      addUserShow: false,
      userId: ''
    }
  },
  methods: {
    onSearch (value) {
      this.queryForm.search = value
      this.handleSearch()
    },
    handleSearch () {
      this.loading = true
      let current = this.queryForm.current
      let pageSize = this.queryForm.pageSize
      let search = this.queryForm.search
      let orderKey = this.queryForm.key
      let orderByValue = this.queryForm.order
      let fullPath = this.queryForm.fullPath
      queryUserList({
        current,
        pageSize,
        search,
        orderKey,
        orderByValue,
        fullPath
      }).then(res => {
        if (res.code === 200) {
          this.pagination.total = res.obj.total
          this.userData = res.obj.rows
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      }).finally(() => {
        this.loading = false
      })
    },
    getSelectData (data, c) {
      if (c.length > 1) {
        let len = c[0]
        c.splice(0, 1)
        return this.getSelectData(data[len].children, c)
      } else {
        return data[c[0]]
      }
    },
    handleAdd () {
      this.addOrgShow = true
    },
    handleUpdate () {
      if (this.parentOrgId === 0) {
        this.$message.warning('请选择需要修改的组织！')
        return false
      }
      this.updateOrgShow = true
    },
    handleDelete () {
      if (this.parentOrgId === 0) {
        this.$message.warning('请选择需要删除的组织！')
        return false
      }
      if (this.hasChildren) {
        this.$message.warning('当前组织底下还有子组织，请先删除自组织再来删除当前组织！')
        return false
      }
      let _this = this
      this.$confirm({
        title: '是否删除当前组织？',
        onOk () {
          deleteOrg({orgId: _this.orgId}).then(res => {
            if (res.code === 200) {
              _this.$message.success(res.msg)
              _this.operateOrgDelete(_this.orgData[0])
              _this.parentId = 1
              _this.orgId = 0
              _this.parentOrgName = '虚拟顶级组织'
              _this.hasChildren = false
            } else {
              _this.$message.error(res.msg)
            }
          })
        }
      })
    },
    handleAddUser () {
      this.addUserShow = true
    },
    operateOrgDelete (c) {
      let _this = this
      let r = -1
      if (c.orgId === this.parentOrgId) {
        for (let j = 0; j < c.children.length; j++) {
          if (c.children[j].orgId === _this.orgId) {
            r = j
          }
        }
        if (r !== -1) {
          c.children.splice(r, 1)
        }
      }
      let childrenLength = c.children.length
      for (let i = 0; i < childrenLength; i++) {
        if (c.children[i].children.length > 0) {
          c.children[i] = this.operateOrgDelete(c.children[i])
        }
        if (c.children[i].orgId === this.parentOrgId) {
          for (let j = 0; j < c.children[i].children.length; j++) {
            if (c.children[i].children[j].orgId === _this.orgId) {
              r = j
            }
          }
          if (r !== -1) {
            c.children[i].children.splice(r, 1)
          }
        }
      }
      return c
    },
    operateOrgUpdate (obj, c) {
      if (c === undefined) {
        c = this.orgData[0]
      }
      if (c.orgId === this.orgId) {
        c.title = obj.orgName
        c.orgCode = obj.orgCode
      }
      let childrenLength = c.children.length
      for (let i = 0; i < childrenLength; i++) {
        c.children[i] = this.operateOrgUpdate(obj, c.children[i])
      }
      return c
    },
    operateOrgAdd (obj, c) {
      if (c === undefined) {
        c = this.orgData[0]
        if (c.orgId === obj.parentOrgId) {
          let o = {}
          o.title = obj.orgName
          o.orgCode = obj.orgCode
          o.orgId = obj.orgId
          o.parentOrgId = obj.parentOrgId
          o.parentOrgName = obj.parentOrgName
          o.fullPath = obj.fullPath
          o.children = []
          o.scopedSlots = {
            'title': 'title'
          }
          o.expand = true
          c.children.push(o)
          return c
        }
      }
      let childrenLength = c.children.length
      for (let i = 0; i < childrenLength; i++) {
        if (c.children[i].children.length > 0) {
          c.children[i] = this.operateOrgAdd(obj, c.children[i])
        }
        if (c.children[i].orgId === obj.parentOrgId) {
          let o = {}
          o.title = obj.orgName
          o.orgCode = obj.orgCode
          o.orgId = obj.orgId
          o.parentOrgId = obj.parentOrgId
          o.parentOrgName = obj.parentOrgName
          o.fullPath = obj.fullPath
          o.children = []
          o.scopedSlots = {
            'title': 'title'
          }
          o.expand = true
          c.children[i].children.push(o)
          return c
        }
      }
      return c
    },
    onSelectChange (selectedKeys) {
      if (selectedKeys.length === 0) {
        this.orgId = 1
        this.parentOrgId = 0
        this.parentOrgName = '虚拟顶级组织'
        this.hasChildren = false
        this.userListTitle = '用户管理'
      } else {
        let selectedKeysSplit = selectedKeys[0].split('-')
        selectedKeysSplit.splice(0, 1)
        let selectData = this.getSelectData(this.orgData, selectedKeysSplit)
        console.log('selectData' + JSON.stringify(selectData))
        this.orgId = selectData.orgId
        this.parentOrgId = selectData.parentOrgId
        this.parentOrgName = selectData.title
        this.userListTitle = selectData.title
        if (selectData.children.length === 0) {
          this.hasChildren = false
        } else {
          this.hasChildren = true
        }
      }
      this.handleSearch()
    },
    onSearchChange (e) {
      const value = e.target.value
      this.nowExpandKeys = []
      this.combineExpandedKeys(this.orgData, '0-', value)
      console.log('expandedKeys=>', this.nowExpandKeys)
      Object.assign(this, {
        expandedKeys: this.nowExpandKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    combineExpandedKeys (orgData, startNode, value) {
      for (let i = 0; i < orgData.length; i++) {
        if (orgData[i].title.indexOf(value) > -1) {
          this.nowExpandKeys.push(startNode + i)
        }
        if (orgData[i].children.length > 0) {
          this.combineExpandedKeys(orgData[i].children, startNode + i + '-', value)
        }
      }
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    initTree () {
      getOrgTree({}).then(res => {
        if (res.code === 200) {
          this.orgData = res.obj
        } else {
          this.$Message.error('加载组织架构菜单节点失败，请与管理联系')
        }
      })
    }
  },
  mounted () {
    this.initTree()
  },
  computed: {
    columns () {
      return [
        {
          key: 'loginAccount',
          title: '用户账号',
          dataIndex: 'loginAccount',
          sorter: true,
          width: '20%'
        },
        {
          key: 'nickName',
          title: '用户姓名',
          dataIndex: 'nickName',
          sorter: true,
          width: '20%'
        },
        {
          key: 'crtDate',
          title: '创建时间',
          dataIndex: 'crtDate',
          sorter: true,
          width: '20%',
          customRender: (text, row, index) => {
            return this.formatDate(new Date(text), 'yyyy/MM/dd hh:mm:ss')
          }
        },
        {
          key: 'lastLoginDate',
          title: '最后登录时间',
          dataIndex: 'lastLoginDate',
          sorter: true,
          width: '20%',
          customRender: (text, row, index) => {
            if (text != null) {
              return this.formatDate(new Date(text), 'yyyy/MM/dd hh:mm:ss')
            }
          }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: {customRender: 'operation'},
          width: '20%'
        }
      ]
    }
  }
}
</script>
