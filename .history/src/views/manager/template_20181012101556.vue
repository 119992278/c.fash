<template>
  <div class="app-container">
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">i18n.t('table.newAdd')</el-button>
    <el-input v-model="searchVal" style="width: 200px;" class="filter-item" placeholder="请输入需要查询" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="3vh" width="60%">
      <el-form ref="dataForm" :model="temp" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="邮件主题:" prop="subject">
          <el-input v-model="temp.subject"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="App名字:">
          <el-select v-model="temp.appName" filterable placeholder="请选择" @change="handleCheckedCitiesChange">
            <el-option v-for="(item,index) in appList" :key="index.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="邮件标识:">
          <el-radio-group v-model="temp.templateType">
            <el-radio label="111">忘记密码</el-radio>
            <el-radio label="0">新用户注册</el-radio>
            <el-radio label="3">验证码</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="语言:">
          <el-radio-group v-model="temp.language">
            <el-radio label="200">汉语</el-radio>
            <el-radio label="201">英语</el-radio>
            <el-radio label="202">法语</el-radio>
            <el-radio label="203">德语</el-radio>
            <el-radio label="204">意大利语</el-radio>
            <el-radio label="205">日语</el-radio>
            <el-radio label="206">韩语</el-radio>
            <el-radio label="207">西班牙语</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="状态">
          <el-radio-group v-model="temp.status">
            <el-radio label="0">禁止</el-radio>
            <el-radio label="1">使用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="更新说明:" prop="updateMessage">
          <el-tag>用户名或账户号: $userName</el-tag>
          <el-tag>用户密码: $userPassword</el-tag>
          <el-tag>验证码: $random</el-tag>
          <el-tag>邮箱: $userMail</el-tag>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="支持模式">
          <el-radio-group v-model="temp.isNew">
            <el-radio label="1">新模式</el-radio>
            <el-radio label="0">旧模式</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="模板内容">
          <quill-editor
            ref="myQuillEditor"
            v-model="temp.template"
            :options="editorOption"
          />
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='新增' + tempName" type="primary" @click="createData">i18n.t('table.newAdd')</el-button>
          <el-button v-else type="primary" @click="updateData">编辑</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="模板编号" min-width="100" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="App名称" min-width="120" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.appName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮件标识" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.templateType | statusStamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="语言" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.language | languangeStamp }}
        </template>
      </el-table-column>
      <el-table-column label="支持模式" min-width="100" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.isNew | isNewStamp }}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="100" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.status | statusStamp2 }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.updateTime | momentStamp }}
        </template>
      </el-table-column>
      <el-table-column label="最后修改人" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.operator }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import Vue from 'vue'
import { quillEditor } from 'vue-quill-editor'
import { getToken, getCookie } from '@/utils/auth'
import _ from 'lodash'
import { momentStampFormat } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import { getTemplateList, addTemplate, getHardwareVersion, getTemplate, getAPPList } from '@/api/dealer'
import { isvalidNoEmpty } from '@/utils/validate'
export default {
  filters: {
    momentStamp(time) {
      return momentStampFormat(time)
    },
    isNewStamp(status) {
      const statusMap = { 1: '新模式', 0: '旧模式' }
      return statusMap[status]
    },
    statusStamp(status) {
      const statusMap = { 0: '新用户注册', 111: '忘记密码', 3: '验证码' }
      return statusMap[status]
    },
    statusStamp2(status) {
      const statusMap = { 0: '停用', 1: '使用' }
      return statusMap[status]
    },
    languangeStamp(status) {
      const statusMap = { 200: '汉语', 201: '	英语', 202: '法语', 203: '德语', 204: '意大利语', 205: '日语', 206: '韩语', 207: '西班牙语' }
      return statusMap[status]
    }
  },
  // 引入组件
  components: {

  },
  data() {
    return {
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link'], // toggled buttons
            ['blockquote', 'code-block'],
            ['image', 'image']
          ]
        }
      },
      tempName: '邮件模板',
      appList: [],
      formLabelWidth: '130px',
      list: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogFormVisible: false,
      dialogStatus: '新增' + this.tempName,
      temp: {
        appId: '',
        appName: '',
        isNew: '1',
        language: '',
        operator: null,
        status: '',
        subject: '',
        template: '',
        templateType: '3'
      },
      listQuery: {
        authority2: this.$store.state.user.authority.authority2 ? this.$store.state.user.authority.authority2.join(',') : '',
        productName: '',
        limit: 10,
        sEcho: 1,
        sortCol: 'appName',
        sortDir: 'asc',
        start: 0
      },
      rules: {
        subject: isvalidNoEmpty
      }
    }
  },
  computed: {
  },
  watch: {
    dialogFormVisible: function(val) {
      const _this = this
      if (val === false) {
        this.$refs['dataForm'].resetFields()
        this.resetTemp()
      } else {
        getAPPList({ limit: 1000, start: 0 }).then(response => {
          const _tempArr = []
          response.rows.map(function(value1, index, arr) {
            _this.appList.push({ value: String(value1.appId), label: value1.appChineseName })
          })
          this.temp.appName = this.appList[0].label
          this.temp.appId = this.appList[0].value
        })
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCheckedCitiesChange: function(val) {
      const _this = this
      this.appList.map(function(value1, index, arr) {
        if (value1.value === String(val)) {
          _this.temp.appName = value1.label
          _this.temp.appId = value1.value
        }
      })
    },
    fetchData() {
      this.listLoading = true
      getTemplateList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = _.sortBy(response.templates, ['id'])
        // this.list = response.templates
        this.totalQuantity = response.total
      })
    },
    search(name) {
      this.listQuery.productName = this.searchVal
      this.fetchData()
    },
    handleCurrentChange: function(page) {
      if (this.listQuery.sEcho !== page) {
        this.listQuery.sEcho = page
        this.listQuery.start = page * 10 - 10
      }
      this.fetchData()
    },
    handleSizeChange: function(page) {
      this.listQuery.limit = page
      this.listQuery.start = 0
      this.fetchData()
    },
    handleAdd: function(params) {
      this.dialogStatus = '新增' + this.tempName
      this.dialogFormVisible = true
    },
    handleUpdate: function(row) {
      this.dialogStatus = '编辑' + this.tempName
      getTemplate(row).then(response => {
        this.dialogFormVisible = true
        this.temp = Object.assign({}, response.mailTemplate)
        this.temp.templateType = String(this.temp.templateType)
        this.temp.language = String(this.temp.language)
        this.temp.status = String(this.temp.status)
        this.temp.isNew = String(this.temp.isNew)
        this.temp.template = this.temp.templateContent
        console.log(this.temp)
      })
    },
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addTemplate(this.temp).then(response => {
            this.dialogFormVisible = false
            Message({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2 * 1000
            })
            this.fetchData()
          })
        }
      })
    },
    updateData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addTemplate(this.temp).then(response => {
            this.dialogFormVisible = false
            Message({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2 * 1000
            })
            this.fetchData()
          })
        }
      })
    },
    uploadhandleSuccess(file) {
      this.temp.updateUrl = process.env.BASE_API + file.msg
    },
    resetTemp() {
      this.temp = {
        appId: '',
        appName: '',
        isNew: '1',
        language: '',
        operator: null,
        status: '',
        subject: '',
        template: '',
        templateType: '3'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-dialog{width:80%}
.el-pagination {
  text-align: center;
  margin-top: 2em;
}
.el-table td, .el-table th{
  padding:16px 0
}
.editor-container {
    min-height: 500px;
    margin: 0 0 30px;
    .editor-upload-btn-container {
      text-align: right;
      margin-right: 10px;
      .editor-upload-btn {
        display: inline-block;
      }
    }
  }
.ql-editor{height:250px}
.el-tag{font-size:14px}
</style>
