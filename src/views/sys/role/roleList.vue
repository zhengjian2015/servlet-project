<template>
  <a-card title="角色管理" class="roleCard">
    <div>
      <div class="addDiv">
        <a-button type="primary" @click="addRoleShow">+新增</a-button>
      </div>
      <div class="searchDiv">
        <a-input-search placeholder="请输入查询条件" style="width:300px;" @search="onSearch"></a-input-search>
      </div>
    </div>
    <div class="tableDiv">
      <a-table
        :columns="columns"
        :dataSource="roleData"
        :pagination="pagination"
        @change="handleTableChange"
        borderde
        :rowKey="record=>record.roleId"
        :loading="loading"
      >
        <template slot="operation" slot-scope="text,record,index">
          <a-button size="small" type="primary" @click="handleEdit(record,index)">
            修改
          </a-button>
          <a-popconfirm title="是否删除当前角色数据？" @confirm="()=>handleDelete(record)">
            <a-button size="small" type="primary">
              删除
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <addRole v-model="addShow" v-on:handleSearch="handleSearch"></addRole>
    <updateRole v-model="updateShow" :roleId="roleId" v-on:handleSearch="handleSearch"></updateRole>
  </a-card>
</template>
<script>
import {queryRoleList} from '../../../api/sys/role/role.api'
import addRole from './addRole'
import updateRole from './updateRole'

export default {
  name: 'roleList',
  components: {
    addRole,
    updateRole
  },
  data () {
    return {
      addShow: false,
      updateShow: false,
      roleId: '',
      roleData: [],
      loading: false,
      pagination: {
        total: 0,
        showSizeChanger: true
      },
      queryForm: {
        search: '',
        current: 1,
        pageSize: 10,
        key: '',
        order: ''
      },
      columns: [
        {
          title: '角色名称',
          dataIndex: 'roleName',
          sorter: true,
          width: '20%'
        },
        {
          title: '角色编码',
          dataIndex: 'roleCode',
          sorter: true,
          width: '20%'
        },
        {
          title: '创建时间',
          dataIndex: 'crtDate',
          sorter: true,
          width: '20%',
          customRender: (text, row, index) => {
            return this.formatDate(new Date(text), 'yyyy/MM/dd hh:mm:ss')
          }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '20%',
          scopedSlots: {customRender: 'operation'}
        }
      ]
    }
  },
  methods: {
    handleCancel () {

    },
    handleUpdate () {

    },
    addRoleShow () {
      this.addShow = true
    },
    onSearch (value) {
      this.queryForm.search = value
      this.handleSearch()
    },
    handleEdit (record, index) {
      this.updateShow = true
      this.roleId = record.roleId
    },
    handleDelete (record) {
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = {...this.pagination}
      pager.current = pagination.current
      this.pagination = pager
      this.queryForm.current = pagination.current
      this.queryForm.pageSize = pagination.pageSize
      this.queryForm.key = sorter.field ? sorter.field : ''
      this.queryForm.order = sorter.order ? sorter.order.replace('end', '') : ''
      this.handleSearch()
    },
    handleSearch () {
      this.loading = true
      let current = this.queryForm.current
      let pageSize = this.queryForm.pageSize
      let search = this.queryForm.search
      let orderKey = this.queryForm.key
      let orderByValue = this.queryForm.order
      const _this = this
      queryRoleList({
        current,
        pageSize,
        search,
        orderKey,
        orderByValue
      }).then(res => {
        if (res.code === 200) {
          _this.$message.success(res.msg)
          _this.pagination.total = res.obj.total
          _this.roleData = res.obj.rows
        } else {
          _this.$message.error(res.msg)
        }
      }).finally(() => {
        _this.loading = false
      })
    }
  }
}
</script>
<style scoped>
  .roleCard {
    min-height: calc(100vh - 274px);
  }

  .roleCard .addDiv {
    display: inline-block;
    float: left;
  }

  .roleCard .searchDiv {
    display: inline-block;
    float: right;
  }

  .roleCard .tableDiv {
    margin-top: 50px;
  }
</style>
