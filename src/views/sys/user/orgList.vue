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
  </a-card>
</template>
<script>
import {getOrgTree} from '../../../api/sys/org/org.api'

export default {
  name: 'orgList',
  components: {
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
    handleUpdate () {
      if (this.parentOrgId === 0) {
        this.$message.warning('请选择需要修改的组织！')
        return false
      }
      this.updateOrgShow = true
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
