<template>
  <a-modal :width="modalWidth" title="修改菜单" :confirmLoading="loading" v-model="show" @ok="handleOk"
           @cancel="handleCancel">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="父节点名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input v-decorator="['parentTreeName',{initialValue:parentTreeName}]" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="菜单名称" :style="{ display:  'block' }" :label-col="{ span: 8 }"
                       :wrapper-col="{ span: 16 }">
            <a-input placeholder="请输入菜单名称" v-decorator="[
              'treeName',
                {
                   rules: this.treeFormRule.treeName
                }
               ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="菜单编码" :style="{ display:  'block' }" :label-col="{ span: 8 }"
                       :wrapper-col="{ span: 16 }">
            <a-input placeholder="请输入菜单编码" v-decorator="[
              'treeCode',
                {
                   rules: this.treeFormRule.treeCode,
                   validateTrigger: 'blur'
                }
               ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="菜单权限" :style="{ display:  'block' }" :label-col="{ span: 4 }"
                       :wrapper-col="{ span: 20 }">
            <a-textarea placeholder="请输入菜单权限" :autosize="{ minRows: 4, maxRows: 8 }"
                        v-decorator="[
              'powerPath',
              {
               rules: this.treeFormRule.powerPath
              }
               ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import {checkTreeCode, getTreeByTreeId, updateTree} from '../../../api/sys/tree/tree.api'
import pick from 'lodash.pick'

export default {
  name: 'addTree',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    parentTreeId: {
      type: Number
    },
    parentTreeName: {
      type: String
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      show: this.value,
      modalWidth: window.innerWidth * 0.5,
      loading: false
    }
  },
  methods: {
    handleOk () {
      this.form.validateFields(err => {
        if (!err) {
          this.loading = true
          let treeFormData = this.form.getFieldsValue()
          treeFormData.parentTreeId = this.parentTreeId
          updateTree(treeFormData).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              // 提交表单数据成功则关闭当前的modal框
              this.closeModal(false)
              // 同时调用父页面的刷新页面的方法
              this.$emit('operateTreeUpdate', res.obj)
            } else {
              this.$message.error(res.msg)
            }
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    checkTreeCode (rule, value, callback) {
      if (value === undefined || value === '') {
        callback()
        return
      }
      checkTreeCode({treeCode: value}).then(res => {
        if (res.obj.success === 'pass') {
          callback()
        } else {
          callback(res.msg)
        }
      })
    },
    handleCancel () {
      this.show = false
    },
    closeModal (val) {
      this.$emit('input', val)
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      // 当重新显示增加数据的时候重置整个form表单
      if (val) {
        this.form.resetFields()
        getTreeByTreeId({treeId: this.treeId}).then(res => {
          if (res.code === 200) {
            this.$nextTick(() => {
              this.form.setFieldsValue(pick(res.obj, ['treeCode', 'powerPath', 'treeName', 'parentTreeName']))
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      } else { // 反之则关闭页面
        this.closeModal(false)
      }
    }
  },
  computed: {
    treeFormRule () {
      return {
        'treeName': [
          {required: true, message: '请输入菜单名称！'},
          {max: 50, message: '菜单名称的最大长度不能大于50个字符！'}
        ],
        'treeCode': [
          {required: true, message: '菜单编码不能为空！'},
          {max: 50, message: '菜单编码的最大长度不能大于50个字符！'},
          // 实现表单的异步验证
          {validator: this.checkTreeCode}
        ],
        'powerPath': [
          {max: 1000, message: '菜单权限的最大长度不能大于1000个字符！'}
        ]
      }
    }
  }
}
</script>
