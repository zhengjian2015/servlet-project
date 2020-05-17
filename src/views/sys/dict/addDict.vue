<template>
  <a-modal :width="modalWidth" title="新增字典" :confimLoading="loading" v-model="show" @ok="handleOk"
           @cancel="handleCancel">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="字典类型" :style="{display:'block'}" :wrapper-col="{span: 15}" :label-col="{ span: 9}">
            <a-input placeholder="请输入字典类型" v-decorator="[
               'dictType',
               {
                  rules: this.dictFormRule.dictType,
                  validateTrigger: 'blur'
               }
               ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="字典编码" :style="{display:'block'}" :wrapper-col="{span: 15}" :label-col="{ span: 9}">
            <a-input placeholder="请输入字典编码" v-decorator="[
               'dictCode',
               {
                  rules: this.dictFormRule.dictCode,
                  validateTrigger: 'blur'
               }
               ]"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="字典数值" :style="{display:'block'}" :wrapper-col="{span: 15}" :label-col="{ span: 9}">
            <a-input placeholder="请输入字典数值" v-decorator="[
               'dictValue',
               {
                  rules: this.dictFormRule.dictValue
               }
               ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="字典描述" :style="{display:'block'}" :wrapper-col="{span: 15}" :label-col="{ span: 9}">
            <a-input placeholder="请输入字典描述" v-decorator="[
               'dictText',
               {
                  rules: this.dictFormRule.dictText
               }
               ]"/>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>

import {addDict, checkTypeAndCode} from '../../../api/sys/dict/dict.api'
export default {
  name: 'addDict',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: this.value,
      form: this.$form.createForm(this),
      modalWidth: window.innerWidth * 0.5,
      loading: false
    }
  },
  methods: {
    checkTypeAndCode (rule, value, callback) {
      let dictType = this.form.getFieldValue('dictType')
      if (dictType === undefined || dictType === '') {
        callback()
        return
      }
      let dictCode = this.form.getFieldValue('dictCode')
      if (dictCode === undefined || dictCode === '') {
        callback()
        return
      }
      checkTypeAndCode({dictType, dictCode}).then(res => {
        if (res.obj.success === 'pass') {
          callback()
        } else {
          callback(res.msg)
        }
      })
    },
    handleOk () {
      this.form.validateFields(err => {
        if (!err) {
          this.loading = true
          addDict(this.form.getFieldsValue()).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.closeModal(false)
              // 调用父页面的handleSearch方法
              this.$emit('handleSearch')
            } else {
              this.$message.error(res.msg)
            }
          }).finally(() => {
            this.loading = false
          })
        }
      })
      setTimeout(() => {
        this.$nextTick(() => {
          this.loading = false
        })
      }, 1000)
    },
    handleCancel () {
      this.closeModal(false)
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
      if (val) {
        this.form.resetFields()
      } else {
        this.closeModal(val)
      }
    }
  },
  computed: {
    dictFormRule () {
      return {
        'dictType': [
          {required: true, message: '字典类型不能为空！'},
          {max: 50, message: '字典类型长度不能大于50个字符！'},
          {validator: this.checkTypeAndCode}
        ],
        'dictCode': [
          {required: true, message: '字典编码不能为空！'},
          {max: 50, message: '字典编码长度不能大于50个字符！'},
          {validator: this.checkTypeAndCode}
        ],
        'dictValue': [
          {required: true, message: '字典数值不能为空！'},
          {max: 50, message: '字典数值长度不能大于50个字符！'}
        ],
        'dictText': [
          {required: true, message: '字典描述不能为空！'},
          {max: 50, message: '字典描述长度不能大于50个字符！'}
        ]
      }
    }
  }
}
</script>
