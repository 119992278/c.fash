<template>
  <div class="weixin-container">
    <el-form ref="dataForm" :model="temp" :rules="rules">
      <el-form-item :label-width="formLabelWidth" label="邮件主题:" prop="subject">
        <el-input v-model="temp.subject"/>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="模板内容:">
        <quill-editor
          ref="myQuillEditor"
          v-model="temp.template"
          :options="editorOption"
        />
      </el-form-item>
      <div class="dialog-footer" align="right">
        <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="send()">发送给所有用户</el-button>
      </div>
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
      formLabelWidth: '130px',
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
