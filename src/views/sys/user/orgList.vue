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
          用户表格
        </a-card>
      </a-col>
    </a-row>
    <updateOrg v-model="updateOrgShow" :orgId="orgId" v-on:operateOrgUpdate="operateOrgUpdate"></updateOrg>
    <addOrg v-model="addOrgShow" :parentOrgId="parentOrgId" :parentOrgName="parentOrgName" v-on:operateOrgAdd="operateOrgAdd"></addOrg>
  </a-card>
</template>
<script>
import {getOrgTree} from '../../../api/sys/org/org.api'
import addOrg from './addOrg'
import updateOrg from './updateOrg'

export default {
  name: 'orgList',
  components: {
    addOrg,
    updateOrg
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
      updateOrgShow: false
    }
  },
  methods: {
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
  }
}
</script>
