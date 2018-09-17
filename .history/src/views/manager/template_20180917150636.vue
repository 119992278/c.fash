<template>
  <div class="app-container">
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">新增</el-button>
    <el-input v-model="searchVal" style="width: 200px;" class="filter-item" placeholder="请输入需要查询" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="3vh" width="60%">
      <el-form ref="dataForm" :model="temp" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="App名字:" prop="productName">
          <el-input v-model="temp.productName"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="邮件标识:" prop="productCode">
          <el-input v-model="temp.productCode" :disabled="dialogStatus === '编辑' + tempName"/> <el-tag>(命名规则:项目英文_事业部编号_客户英文简称 例 WT10_OEM02_appscomm)</el-tag>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="版本号:" prop="deviceVersion">
          <el-input v-model="temp.deviceVersion"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="升级地址:" prop="updateUrl">
          <el-input v-model="temp.updateUrl"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="CRC:">
          <el-input v-model="temp.fileCrcSize"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="更新说明:" prop="updateMessage">
          <el-input v-model="temp.updateMessage"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="固件功能:" prop="versionMessage">
          <el-input v-model="temp.versionMessage"/>
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='新增' + tempName" type="primary" @click="createData">新增</el-button>
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
      <el-table-column label="App名称" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.appName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮件标识" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.templateType | statusStamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="语言" min-width="160" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.language | languangeStamp }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" min-width="160" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.createTime |momentStamp }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="最后修改人" min-width="160" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.versionMessage }}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="160" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.currentVersion }}
        </template>
      </el-table-column>
      <el-table-column label="模板编号" min-width="160" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.currentVersion }}
        </template>
      </el-table-column> -->
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
import { getToken, getCookie } from '@/utils/auth'
import { momentStampFormat } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import { getTemplateList, addTemplate, getHardwareVersion, getTemplate } from '@/api/dealer'
import { isvalidNoEmpty, isvalidURL } from '@/utils/validate'
export default {
  filters: {
    momentStamp(time) {
      return momentStampFormat(time)
    },
    statusStamp(status) {
      const statusMap = { 0: '新用户注册', 111: '忘记密码', 3: '验证码' }
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
      tempName: '邮件模板',
      fileList: [],
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
        isNew: '',
        language: '',
        operator: null,
        status: '',
        subject: '',
        template: '',
        templateType: ''
      },
      listQuery: {
        authority2: this.$store.state.user.authority.authority2.join(','),
        productName: '',
        limit: 50,
        sEcho: 1,
        sortCol: 'appName',
        sortDir: 'asc',
        start: 0
      },
      rules: {
        productName: isvalidNoEmpty,
        updateUrl: isvalidNoEmpty,
        deviceVersion: isvalidNoEmpty,
        productCode: isvalidNoEmpty
      }
    }
  },
  computed: {
    myHeaders() {
      return {
        accessToken: getToken(),
        customerAccountId: getCookie('customerAccountId'),
        customerId: getCookie('customerId')
      }
    }
  },
  watch: {
    dialogFormVisible: function(val) {
      if (val === false) {
        this.$refs['dataForm'].resetFields()
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getTemplateList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.templates
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
      console.log(row)
      this.dialogStatus = '编辑' + this.tempName
      getTemplate(row).then(response => {
        this.dialogFormVisible = true
        this.temp = Object.assign({}, response.data)
        this.temp.deviceVersion = response.data.newVersion
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
</style>
