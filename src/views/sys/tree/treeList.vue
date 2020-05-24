<template>
  <a-card title="菜单管理">
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
          <a-tree
            v-if="treeData.length"
            defaultExpandAll
            :treeData="treeData"
            @select="onSelectChange"
          ></a-tree>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card title="按钮管理" :bordered="true" style="min-height: calc(100vh - 274px);">
          按钮列表
        </a-card>
      </a-col>
    </a-row>
    <addTree v-model="addTreeShow" :parentTreeId="treeId" :parentTreeName="parentTreeName"
             v-on:operateTreeAdd="operateTreeAdd"
    ></addTree>
    <updateTree v-model="updateTreeShow" :treeId="treeId" v-on:operateTreeUpdate="operateTreeUpdate"></updateTree>
  </a-card>
</template>
<script>
import {getTreeList, deleteTree} from '../../../api/sys/tree/tree.api'
import addTree from './addTree'
import updateTree from './updateTree'

export default {
  name: 'treeList',
  components: {
    addTree,
    updateTree
  },
  data () {
    return {
      treeData: [],
      parentTreeName: '顶层节点',
      parentTreeId: 0,
      treeId: 0,
      hasChildren: false,
      addTreeShow: false,
      updateTreeShow: false
    }
  },
  methods: {
    handleDelete () {
      if (this.treeId === 0) {
        this.$message.warning('请选择需要删除的节点进行删除！')
        return
      }
      if (this.hasChildren) {
        this.$message.warning('请先删除其子节点，然后再删除当前菜单节点！')
        return
      }
      let _this = this
      this.$confirm({
        title: '是否删除当前菜单节点',
        onOk () {
          deleteTree({treeId: _this.treeId}).then(res => {
            if (res.code === 200) {
              _this.$message.success(res.msg)
              for (let i = 0; i < _this.treeData.length; i++) {
                if (_this.parentTreeId === 0) {
                  if (_this.treeId === _this.treeData[i].treeId) {
                    _this.treeData.splice(i, 1)
                    break
                  }
                } else {
                  if (_this.operateTreeDelete(_this.treeData[i])) {
                    break
                  }
                }
              }
              _this.treeId = 0
              _this.parentTreeId = 0
              _this.parentTreeName = '顶层节点'
            } else {
              _this.$message.error(res.msg)
            }
          })
        },
        onCancel () {
          console.log('------')
        }
      })
    },
    handleUpdate () {
      if (this.treeId === 0) {
        this.$message.warning('请选择需要修改的节点进行修改！')
        return
      }
      this.updateTreeShow = true
    },
    handleAdd () {
      this.addTreeShow = true
    },
    operateTreeDelete (c) {
      let _this = this
      let r = -1
      for (let j = 0; j < c.children.length; j++) {
        if (c.children[j].treeId === _this.treeId) {
          r = j
        } else {
          this.operateTreeDelete(c.children[j])
        }
      }
      if (r !== -1) {
        c.children.splice(r, 1)
      }
      return false
    },
    operateTreeUpdate (obj, c) {
      for (let i = 0; i < this.treeData.length; i++) {
        c = this.treeData[i]
        if (c.treeId === obj.treeId) {
          c.title = obj.treeName
          c.treeCode = obj.treeCode
          return c
        } else {
          this.recursionUpdateTree(obj, c)
        }
      }
    },
    recursionUpdateTree (obj, c) {
      for (let i = 0; i < c.children.length; i++) {
        let k = c.children[i]
        if (k.treeId === obj.treeId) {
          k.title = obj.treeName
          k.treeCode = obj.treeCode
          return k
        } else {
          this.recursionUpdateTree(obj, k)
        }
      }
    },
    operateTreeAdd (obj, c) {
      // 表示当前新增的菜单节点是属于顶层的菜单节点因此需要做特殊处理
      if (obj.parentTreeId === 0) {
        let o = {}
        o.title = obj.treeName
        o.treeCode = obj.treeCode
        o.treeId = obj.treeId
        o.parentTreeId = obj.parentTreeId
        o.parentTreeName = obj.parentTreeName
        o.children = []
        o.expand = true
        this.treeData.push(o)
        return
      }
      for (let i = 0; i < this.treeData.length; i++) {
        c = this.treeData[i]
        if (c.treeId === obj.parentTreeId) {
          let o = {}
          o.title = obj.treeName
          o.treeCode = obj.treeCode
          o.treeId = obj.treeId
          o.parentTreeId = obj.parentTreeId
          o.parentTreeName = obj.parentTreeName
          o.children = []
          o.expand = true
          c.children.push(o)
          return
        } else {
          this.recursionAddTree(obj, c)
        }
      }
    },
    recursionAddTree (obj, c) {
      for (let i = 0; i < c.children.length; i++) {
        let k = c.children[i]
        if (k.treeId === obj.parentTreeId) {
          let o = {}
          o.title = obj.treeName
          o.treeCode = obj.treeCode
          o.treeId = obj.treeId
          o.parentTreeId = obj.parentTreeId
          o.parentTreeName = obj.parentTreeName
          o.children = []
          o.expand = true
          k.children.push(o)
        } else {
          this.recursionAddTree(obj, k)
        }
      }
    },
    onSelectChange (selectedKeys, info) {
      if (selectedKeys.length === 0) {
        this.treeId = 0
        this.parentTreeId = 0
        this.parentTreeName = '顶层节点'
        this.hasChildren = false
      } else {
        this.treeId = info.selectedNodes[0].data.props.treeId
        this.parentTreeId = info.selectedNodes[0].data.props.parentTreeId
        this.parentTreeName = info.selectedNodes[0].data.props.title
        if (info.selectedNodes[0].data.props.dataRef.children.length === 0) {
          this.hasChildren = false
        } else {
          this.hasChildren = true
        }
      }
    },
    initTree () {
      getTreeList({}).then(res => {
        if (res.code === 200) {
          this.treeData = res.obj
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  // created:html加载完成之前，执行。执行顺序：父组件-子组件
  // mounted:html加载完成后执行。执行顺序：子组件-父组件
  mounted () {
    this.initTree()
  }
}
</script>
