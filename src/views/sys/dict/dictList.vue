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
        <template slot="operation" slot-scope="text,record,index">
          <a-button size="small" type="primary" @click="handleEdit(record,index)">
            修改
          </a-button>
          <a-popconfirm title="是否删除当前字典数据？" @click="()=>handleDelete(record)">
            <a-button size="small" type="primary" >
              删除
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <addDict v-model="addShow" v-on:handleSearch="handleSearch"></addDict>
  </a-card>
</template>
<script>
import addDict from './addDict'

export default {
  name: 'dictList',
  components: {
    addDict
  },
  data () {
    return {
      addShow: false,
      dictData: [],
      loading: false,
      pagination: {
        total: 0,
        showSizeChanger: true
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
          sorter: true,
          width: '20%'
        },
        {
          title: '字典描述',
          dataIndex: 'dictText',
          sorter: true,
          width: '20%'
        },
        {
          title: '字典数值',
          dataIndex: 'dictValue',
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
    addDictShow () {
      this.addShow = true
    },
    onSearch (value) {
      console.log('查询列表！')
    },
    handleEdit (record, index) {
      console.log('编辑数据！')
    },
    handleDelete (record) {
      console.log('删除数据！')
    },
    handleTableChange (pagination, filters, sorter) {
      console.log('pagination=>' + JSON.stringify(pagination))
      console.log('filters=>' + JSON.stringify(filters))
      console.log('sorter=>' + JSON.stringify(sorter))
    },
    handleSearch () {
      console.log('查询列表！-----')
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
