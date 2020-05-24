<template>
  <a-card title="组织管理">
    <a-row :gutter="24">
      <a-col :span="5">
        <a-card :bordered="true" style="min-height: calc(100vh - 274px);">
          <a-button-group>
            <a-button type="primary" size="small" @click="handleAdd">
              新增
            </a-button>
            <a-button type="primary" size="small" @click="handleUpdate">
              修改
            </a-button>
          </a-button-group>
          <a-input-search style="margin-left: 10px;margin-top:5px; width: 144px;" size="small" placeholder="请输入组织" @change="onSearchChange"/>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card :title="userListTitle" :bordered="true" style="min-height: calc(100vh - 274px);">
          用户表格
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>
