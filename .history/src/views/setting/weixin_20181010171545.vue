<template>
  <div class="weixin-container">
    <el-form ref="dataForm" :model="temp" :rules="rules" >
      <el-row>
        <el-col :span="8">
          <el-form-item :label-width="formLabelWidth" label="APPID:" prop="name">
            <el-input v-model="temp.appid"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="formLabelWidth" label="Secret:" prop="name">
            <el-input v-model="temp.secret"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="formLabelWidth" label="Product:" prop="name">
            <el-input v-model="temp.product"/>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-table :data="macData">
        <el-table-column label="MAC地址" align="center" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-input v-model="scope.row.md5"/>
          </template>
        </el-table-column>
      </el-table> -->
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        :disable-transitions="false"
        closable
        @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputValue"
        class="input-new-tag"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
      <div class="dialog-footer" align="right">
        <el-button class="filter-item" type="primary" @click="accredit()">开始授权</el-button>
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
      macData: ['123456789ABC'],
      rules: {
        name: isvalidNoEmpty
      }
    }
  },
  created() {
  },
  methods: {
    handleAdd() {},
    accredit() {
      alert(123)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.weixin-container{
  width:90%;
  padding:2%;
  .ql-editor{height:250px}
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
