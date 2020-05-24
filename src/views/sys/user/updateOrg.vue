<template>
  <a-modal :width="modalWidth" title="修改组织" :confirmLoading="loading" v-model="show" @ok="handleOk" @cancel="handleCancel">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="父组织名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-input v-decorator="['parentOrgName']" disabled/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="组织名称" :style="{ display:  'block' }" :label-col="{ span: 8 }"
                       :wrapper-col="{ span: 16 }">
            <a-input placeholder="请输入组织名称" v-decorator="[
              'orgName',
                {
                  rules: this.orgFormRule.orgName
                },
               ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="组织编码" :style="{ display:  'block' }" :label-col="{ span: 8 }"
                       :wrapper-col="{ span: 16 }">
            <a-input placeholder="请输入组织编码" v-decorator="[
              'orgCode',
                {
                   rules: this.orgFormRule.orgCode,
                   validateTrigger: 'blur'
                },
               ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import {checkOrgNameAndCode, getOrgByOrgId, updateOrg} from '../../../api/sys/org/org.api'
import pick from 'lodash.pick'

export default {
  name: 'updateOrg',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    orgId: {
      type: Number
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
    handleOk () {
      this.form.validateFields(err => {
        if (!err) {
          this.loading = true
          let orgFormData = this.form.getFieldsValue()
          orgFormData.orgId = this.orgId
          updateOrg(orgFormData).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              // 提交表单数据成功则关闭当前的modal框
              this.closeModal(false)
              // 同时调用父页面的刷新页面的方法
              this.$emit('operateOrgUpdate', res.obj)
            } else {
              this.$message.error(res.msg)
            }
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    handleCancel () {
      this.show = false
    },
    closeModal (val) {
      this.$emit('input', val)
    },
    checkOrgCode (rule, value, callback) {
      checkOrgNameAndCode({orgCode: value, orgId: this.orgId}).then(res => {
        if (res.obj.success === 'pass') {
          callback()
        } else {
          callback(res.msg)
        }
      })
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
        getOrgByOrgId({orgId: this.orgId}).then(res => {
          if (res.code === 200) {
            this.$nextTick(() => {
              this.form.setFieldsValue(pick(res.obj, ['parentOrgName', 'orgName', 'orgCode']))
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
    orgFormRule () {
      return {
        'orgName': [
          {required: true, message: '组织名称不能为空！'},
          {max: 50, message: '组织名称长度不能大于50个字符！'}
        ],
        'orgCode': [
          {required: true, message: '组织编码不能为空！'},
          {max: 50, message: '组织编码长度不能大于50个字符！'},
          {validator: this.checkOrgCode}
        ]
      }
    }
  }
}
</script>
