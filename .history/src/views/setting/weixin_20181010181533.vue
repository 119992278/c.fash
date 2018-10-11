<template>
  <div class="weixin-container">
    <el-form ref="dataForm" :rules="rules" >
      <el-row>
        <el-col :span="8">
          <el-form-item :label-width="formLabelWidth" label="APPID:" prop="name">
            <el-input v-model="appid"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="formLabelWidth" label="Secret:" prop="name">
            <el-input v-model="secret"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label-width="formLabelWidth" label="Product:" prop="name">
            <el-input v-model="product"/>
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
      <el-row>
        <el-col :span="24">
          <el-form-item :label-width="formLabelWidth" label="MAC地址:">
            <el-tag
              v-for="tag in macs"
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
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新的MAC地址</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="dialog-footer" align="right">
        <el-button class="filter-item" type="primary" @click="accredit()">开始授权</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { isvalidNoEmpty } from '@/utils/validate'
import { weixinAccredit } from '@/api/weixin'
export default {
  components: {},
  data() {
    return {
      formLabelWidth: '130px',
      appid: 'wx1b66680fa61dcd99',
      secret: '2cb9546935896cfab9e34e18eccea094',
      product: '38143',
      macs: ['123456789ABC'],
      inputVisible: false,
      inputValue: '',
      macData: ['123456789ABC'],
      rules: {
        name: isvalidNoEmpty
      }
    }
  },
  created() {},
  methods: {
    handleClose(tag) {
      this.macs.splice(this.macs.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.macs.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    accredit() {
      const _dt = { appid: this.appid, secret: this.secret, product: this.product, macs: this.macs }
      axios
        .post('http://localhost:3000/accredit', _dt)
        .then(function(response) {
          alert(response.resp[0].errmsg)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.weixin-container {
  width: 90%;
  padding: 2%;
  .ql-editor {
    height: 250px;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  width: 200px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 200px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
