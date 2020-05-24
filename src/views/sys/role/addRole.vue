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
