<template>
  <div class="weixin-container">
    <12345
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
