<template>
  <div class="email-container">
    <el-form ref="dataForm" :model="temp" :rules="rules">
      <el-button class="filter-item" type="primary" icon="el-icon-outline" @click="send()">下载注册用户手机号</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-outline" @click="send()">下载注册用户邮箱</el-button>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
  },
  data() {
    return {
      temp: '',
      content: '',
      searchVal: ''
    }
  },
  created() {
  },
  methods: {
    handleAdd() {},
    send() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.email-container{
  padding:2%;
  .ql-editor{height:250px}
  }
</style>
