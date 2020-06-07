<template>
  <a-modal :width="modalWidth" title="新增用户" :confirmLoading="loading" v-model="show" @ok="handleOk"
           @cancel="handleCancel">
    <a-form :form="form">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="用户组织" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-cascader :options="orgData" @change="onChange" placeholder="请选择用户组织"
                        v-decorator="[
              'orgIds',
                {
                  rules: this.userFormRule.orgIds
                }
               ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="用户账号" :style="{ display:  'block' }" :label-col="{ span: 8 }"
                       :wrapper-col="{ span: 16 }">
            <a-input placeholder="请输入用户账号" v-decorator="[
              'loginAccount',
                {
                  rules: this.userFormRule.loginAccount
                }
               ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="用户名称" :style="{ display:  'block' }" :label-col="{ span: 8 }"
                       :wrapper-col="{ span: 16 }">
            <a-input placeholder="请输入用户账号" v-decorator="[
              'nickName',
                {
                 rules: this.userFormRule.nickName
                }
               ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="用户角色" :style="{ display:  'block' }" :label-col="{ span: 4 }"
                       :wrapper-col="{ span: 20 }">
            <a-select
              labelInValue
              mode="multiple"
              placeholder="请选择用户角色"
              @change="handleSelectChange"
              style="width: 100%"
              v-decorator="[
              'roles',
                {
                  rules: this.userFormRule.roles
                }
               ]"
            >
              <a-select-option v-for="item in filteredOptions" :key="item.roleId" :value="item.roleId">
                {{item.roleName}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="用户地址" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
            <a-cascader :options="aData" @change="onPcaChange" placeholder="请选择用户地址" v-decorator="[
              'pca',
                {
                  rules: this.userFormRule.pca
                }
               ]"/>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="街道地址" :style="{ display:  'block' }" :label-col="{ span: 4 }"
                       :wrapper-col="{ span: 20 }">
            <a-input placeholder="请输入街道地址" v-decorator="[
              'address',
                {
                  rules: this.userFormRule.address
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
import {getOrgCascader} from '../../../api/sys/org/org.api'
import areaData from 'area-data'
import {
  loadAllRole,
  createUser,
  checkLoginAccount
} from '../../../api/sys/user/user.api'

export default {
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
      orgData: [],
      showLevel: 3,
      aData: [],
      selectedItems: [],
      roleData: [],
      pcaInfo: {
        province: '',
        provinceName: '',
        city: '',
        cityName: '',
        area: '',
        areaName: ''
      },
      loading: false
    }
  },
  methods: {
    handleSelectChange (selectedItems) {
      this.selectedItems = selectedItems.map(val => {
        return val.label.replace(/^\s+|\s+$/g, '')
      })
    },
    combineAreaData (val, level) {
      if (level === 0) {
        return []
      }
      let proData = []
      for (const p in areaData[val]) {
        let proitem = {
          value: p,
          label: areaData[val][p],
          children: this.combineAreaData(p, level - 1)
        }
        if (this.showLevel > 0 && areaData[p]) {
          proitem.loading = false
        }
        proData.push(proitem)
      }
      return proData
    },
    onPcaChange (value, selectedOptions) {
      this.pcaInfo.province = value[0]
      this.pcaInfo.city = value[1]
      this.pcaInfo.area = value[2]
      this.pcaInfo.provinceName = selectedOptions[0].label
      this.pcaInfo.cityName = selectedOptions[1].label
      this.pcaInfo.areaName = selectedOptions[2].label
    },
    onChange (value) {
      console.log('value=>', value)
    },
    handleOk () {
      this.form.validateFields(err => {
        if (!err) {
          this.loading = true
          let userFormData = this.form.getFieldsValue()
          console.log('userFormData.roles', userFormData.roles)
          let roles = userFormData.roles.map(value => {
            return value.key
          })
          createUser({
            loginAccount: userFormData.loginAccount,
            nickName: userFormData.nickName,
            headImg: '',
            orgIds: userFormData.orgIds.join(','),
            roles: roles.join(','),
            province: this.pcaInfo.province,
            provinceName: this.pcaInfo.provinceName,
            city: this.pcaInfo.city,
            cityName: this.pcaInfo.cityName,
            area: this.pcaInfo.area,
            areaName: this.pcaInfo.areaName,
            address: userFormData.address
          }).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              // 提交表单数据成功则关闭当前的modal框
              this.closeModal(false)
              // 同时调用父页面的刷新页面的方法
              this.$emit('handleSearch')
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
    checkLoginAccount (rule, value, callback) {
      if (value === undefined || value === '') {
        callback()
        return
      }
      checkLoginAccount({loginAccount: value}).then(res => {
        if (res.obj.success === 'pass') {
          callback()
        } else {
          callback(res.msg)
        }
      })
    }
  },
  computed: {
    filteredOptions () {
      return this.roleData.filter(o => !this.selectedItems.includes(o.roleName))
    },
    userFormRule () {
      return {
        'orgIds': [
          {required: true, message: '组织不能为空!'}
        ],
        'loginAccount': [
          {required: true, message: '用户账号不能为空！'},
          {max: 50, message: '用户账号长度不能大于50个字符！'},
          {validator: this.checkLoginAccount}
        ],
        'nickName': [
          {required: true, message: '用户名称不能为空！'},
          {max: 50, message: '用户名称长度不能大于50个字符！'}
        ],
        'roles': [
          {required: true, message: '用户角色不能为空！'}
        ],
        'pca': [
          {required: true, message: '用户地址不能为空！'}
        ],
        'address': [
          {required: true, message: '具体地址不能为空！'},
          {max: 50, message: '具体地址长度不能大于50个字符！'}
        ]
      }
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
        getOrgCascader({}).then(res => {
          if (res.code === 200) {
            this.orgData = res.obj
          } else {
            this.$Message.error(res.msg)
          }
        })
        loadAllRole({}).then(res => {
          if (res.code === 200) {
            this.roleData = res.obj
          } else {
            this.$Message.error(res.msg)
          }
          this.aData = this.combineAreaData('86', 3)
        })
      } else { // 反之则关闭页面
        this.closeModal(false)
      }
    }
  }
}
</script>
