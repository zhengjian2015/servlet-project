<template>
  <a-modal :width="modalWidth" title="新增角色" :confimLoading="loading" v-model="show" @ok="handleOk"
           @cancel="handleCancel">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="11">
          <a-form-item label="角色名称" :style="{display:'block'}" :wrapper-col="{span: 15}" :label-col="{ span: 9}">
            <a-input placeholder="请输入角色名称" v-decorator="[
               'roleName',
               {
                  rules: this.roleFormRule.roleName,
                  validateTrigger: 'blur'
               }
               ]"/>
          </a-form-item>
          <a-form-item label="角色编码" :style="{display:'block'}" :wrapper-col="{span: 15}" :label-col="{ span: 9}">
            <a-input placeholder="请输入角色编码" v-decorator="[
               'roleCode',
               {
                  rules: this.roleFormRule.roleCode,
                  validateTrigger: 'blur'
               }
               ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="2">
        </a-col>
        <a-col :span="11">
          <a-tree
            v-if="roleTrees.length"
            checkable
            defaultExpandAll
            :treeData="roleTrees"
            @check="onCheck"
          >

          </a-tree>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import {addRole, checkRoleCodeAndName, loadTree} from '../../../api/sys/role/role.api'

export default {
  name: 'addRole',
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
      loading: false,
      roleTrees: [],
      confirmCheckedKeys: []
    }
  },
  methods: {
    handleOk () {
      let treeArray = []
      for (let i = 0; i < this.confirmCheckedKeys.length; i++) {
        let checkeds = this.confirmCheckedKeys[i].split('-')
        checkeds.splice(0, 1)
        let checked = this.getCheckedData(this.roleTrees, checkeds)
        if (checked !== undefined) {
          treeArray.push(checked.treeId)
        }
      }
      this.form.validateFields(err => {
        if (!err) {
          this.loading = true
          let roleFormData = this.form.getFieldsValue()
          roleFormData.treeIds = treeArray.join(',')
          addRole(roleFormData).then(res => {
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
    getCheckedData (data, c) {
      if (c.length > 1) {
        let len = c[0]
        c.splice(0, 1)
        return this.getCheckedData(data[len].children, c)
      } else {
        return data[c[0]]
      }
    },
    onCheck (checkedKeys, info) {
      this.confirmCheckedKeys = checkedKeys.concat(info.halfCheckedKeys)
      console.log(JSON.stringify(this.confirmCheckedKeys))
    },
    checkRoleCode (rule, value, callback) {
      if (value === undefined || value === '') {
        callback()
      } else {
        checkRoleCodeAndName({roleCode: value}).then(res => {
          if (res.obj.success === 'pass') {
            callback()
          } else {
            let mess = '角色编码重复！'
            callback(mess)
          }
        })
      }
    },
    checkRoleName (rule, value, callback) {
      if (value === undefined || value === '') {
        callback()
      } else {
        checkRoleCodeAndName({roleCode: value}).then(res => {
          if (res.obj.success === 'pass') {
            callback()
          } else {
            let mess = '角色名称重复！'
            callback(mess)
          }
        })
      }
    },
    handleCancel () {
      this.closeModal(false)
    },
    closeModal (val) {
      this.$emit('input', val)
    },
    initTree () {
      loadTree({}).then(res => {
        this.roleTrees = res.obj
      })
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      if (val) {
        this.form.resetFields()
        this.initTree()
      } else {
        this.closeModal(val)
      }
    }
  },
  computed: {
    roleFormRule () {
      return {
        'roleName': [
          {required: true, message: '角色名称不能为空！'},
          {max: 50, message: '角色名称长度不能大于50个字符！'},
          {validator: this.checkRoleName}
        ],
        'roleCode': [
          {required: true, message: '角色编码不能为空！'},
          {max: 50, message: '角色编码长度不能大于50个字符！'},
          {validator: this.checkRoleCode}
        ]
      }
    }
  }
}
</script>
