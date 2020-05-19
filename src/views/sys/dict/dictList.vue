<template>
  <a-card title="数据字典管理" class="dictCard">
    <div>
      <div class="addDiv">
        <a-button type="primary" @click="addDictShow">+新增</a-button>
      </div>
      <div class="searchDiv">
        <a-input-search placeholder="请输入查询条件" style="width:300px;" @search="onSearch"></a-input-search>
      </div>
    </div>
    <div class="tableDiv">
      <a-table
        :columns="columns"
        :dataSource="dictData"
        :pagination="pagination"
        @change="handleTableChange"
        borderde
        :rowKey="record=>record.id"
        :loading="loading"
      >
        <template slot="dictCode" slot-scope="text,record,index">
          <div v-if="editForm.editIndex === index">
            <a-input v-model="editForm.editDictCode"/>
          </div>
          <template v-else>{{text}}</template>
        </template>
        <template slot="dictText" slot-scope="text,record,index">
          <div v-if="editForm.editIndex === index">
            <a-input v-model="editForm.editDictText"/>
          </div>
          <template v-else>{{text}}</template>
        </template>
        <template slot="dictValue" slot-scope="text,record,index">
          <div v-if="editForm.editIndex === index">
            <a-input v-model="editForm.editDictValue"/>
          </div>
          <template v-else>{{text}}</template>
        </template>
        <template slot="operation" slot-scope="text,record,index">
          <a-button size="small" type="primary" @click="handleEdit(record,index)" v-if="editForm.editIndex === -1">
            修改
          </a-button>
          <a-popconfirm title="是否删除当前字典数据？" @confirm="()=>handleDelete(record)" v-if="editForm.editIndex === -1">
            <a-button size="small" type="primary">
              删除
            </a-button>
          </a-popconfirm>
          <a-button size="small" type="primary" @click="handleUpdate" v-if="editForm.editIndex === index">
            保存
          </a-button>
          <a-button size="small" type="primary" @click="handleCancel" v-if="editForm.editIndex === index">
            取消
          </a-button>
        </template>
      </a-table>
    </div>
    <addDict v-model="addShow" v-on:handleSearch="handleSearch"></addDict>
  </a-card>
</template>
<script>
import addDict from './addDict'
import {deleteDict, updateDict, queryDictList} from '../../../api/sys/dict/dict.api'

export default {
  name: 'dictList',
  components: {
    addDict
  },
  data () {
    return {
      editForm: {
        editIndex: -1,
        editId: '',
        editDictCode: '',
        editDictValue: '',
        editDictText: ''
      },
      addShow: false,
      dictData: [],
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
          title: '字典类型',
          dataIndex: 'dictType',
          sorter: true,
          width: '20%'
        },
        {
          title: '字典编码',
          dataIndex: 'dictCode',
          scopedSlots: {customRender: 'dictCode'},
          sorter: true,
          width: '20%'
        },
        {
          title: '字典描述',
          dataIndex: 'dictText',
          // 点编辑出现效果
          scopedSlots: {customRender: 'dictText'},
          sorter: true,
          width: '20%'
        },
        {
          title: '字典数值',
          dataIndex: 'dictValue',
          scopedSlots: {customRender: 'dictValue'},
          sorter: true,
          width: '20%'
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
      this.editForm.editIndex = -1
    },
    handleUpdate () {
      updateDict({
        id: this.editForm.editId,
        dictCode: this.editForm.editDictCode,
        dictText: this.editForm.editDictText,
        dictValue: this.editForm.editDictValue
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.editForm.editIndex = -1
          this.handleSearch()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    addDictShow () {
      this.addShow = true
    },
    onSearch (value) {
      console.log('查询列表！')
      this.queryForm.search = value
      this.handleSearch()
    },
    handleEdit (record, index) {
      console.log('编辑数据！')
      this.editForm.editIndex = index
      this.editForm.editId = record.id
      this.editForm.editDictCode = record.dictCode
      this.editForm.editDictText = record.dictText
      this.editForm.editDictValue = record.dictValue
    },
    handleDelete (record) {
      console.log('删除数据！')
      deleteDict({id: record.id}).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.handleSearch()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleTableChange (pagination, filters, sorter) {
      console.log('pagination=>' + JSON.stringify(pagination))
      console.log('filters=>' + JSON.stringify(filters))
      console.log('sorter=>' + JSON.stringify(sorter))

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
      queryDictList({
        current,
        pageSize,
        search,
        orderKey,
        orderByValue
      }).then(res => {
        if (res.code === 200) {
          _this.$message.success(res.msg)
          _this.pagination.total = res.obj.total
          _this.dictData = res.obj.rows
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
  .dictCard {
    min-height: calc(100vh - 274px);
  }

  .dictCard .addDiv {
    display: inline-block;
    float: left;
  }

  .dictCard .searchDiv {
    display: inline-block;
    float: right;
  }

  .dictCard .tableDiv {
    margin-top: 50px;
  }
</style>
