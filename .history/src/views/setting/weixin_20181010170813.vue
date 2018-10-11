<template>
  <div class="weixin-container">
    <el-form ref="dataForm" :model="temp" :rules="rules" >
      <el-form-item :label-width="formLabelWidth" label="APPID:" prop="name">
        <el-input v-model="temp.appid"/>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="Secret:" prop="name">
        <el-input v-model="temp.secret"/>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="Product:" prop="name">
        <el-input v-model="temp.product"/>
      </el-form-item>
      <div class="dialog-footer" align="right">
        <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="send()">发送给所有用户</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { isvalidNoEmpty } from '@/utils/validate'
export default {
  components: {
  },
  data() {
    return {
      formLabelWidth: '130px',
      temp: {
        name: '',
        secret: '',
        product: ''
      },
      content: '',
      searchVal: '',
      rules: {
        name: isvalidNoEmpty
      }
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
.weixin-container{
  width:90%;
  padding:2%;
  .ql-editor{height:250px}
  }
</style>
