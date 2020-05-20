<template>
  <a-card title="菜单管理">
    <a-row :gutter="24">
      <a-col :span="5">
        <a-card :bordered="true" style="min-height: calc(100vh - 274px);">
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
  </a-card>
</template>
<script>
import {getTreeList} from '../../../api/sys/tree/tree.api'

export default {
  name: 'treeList',
  data () {
    return {
      treeData: []
    }
  },
  methods: {
    onSelectChange (selectedKeys, info) {
      console.log(selectedKeys + '---' + info)
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
