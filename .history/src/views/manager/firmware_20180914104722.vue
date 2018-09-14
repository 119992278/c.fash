<template>
  <div class="app-container">
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">新增</el-button>
    <el-input v-model="searchVal" style="width: 200px;" class="filter-item" placeholder="请输入需要查询" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="3vh" width="70%">
      <el-form ref="dataForm" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="上传固件:" prop="customerAccount">
          <el-upload
            ref="upload"
            :headers="myHeaders"
            :on-success = "handleSuccess"
            :file-list="fileList"
            :auto-upload="true"
            :show-file-list="false"
            accept=".zip"
            class="upload-demo"
            action="http://testc.appscomm.cn/dealer/upload/">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button> (只能上传zip文件，且不超过800kb)
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
          </el-upload>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="名字:" prop="productName">
          <el-input v-model="form.productName"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="编号:" prop="productCode">
          <el-input v-model="form.productCode"/> <el-tag>(命名规则:项目英文_事业部编号_客户英文简称 例 WT10_OEM02_appscomm)</el-tag>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="版本号:" prop="deviceVersion">
          <el-input v-model="form.deviceVersion"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="升级地址:" prop="updateUrl">
          <el-input v-model="form.updateUrl"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="CRC:">
          <el-input v-model="form.fileCrcSize"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="更新说明:" prop="updateMessage">
          <el-input v-model="form.updateMessage"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="固件功能:" prop="versionMessage">
          <el-input v-model="form.versionMessage"/>
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="createData">新增</el-button>
          <!-- <el-button v-if="dialogStatus=='新增会员'" type="primary" @click="createData">新增会员</el-button>
          <el-button v-else type="primary" @click="updateData">会员</el-button> -->
        </div>
      </el-form>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="list"
      :row-class-name="tableRowClassName"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="固件名称" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="固件编号" width="110" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.productCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前固件版本" min-width="160" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.currentVersion }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="更新时间" min-width="160" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.updateTime |momentStamp }}
        </template>
      </el-table-column>
      <el-table-column label="更新内容" min-width="160" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.versionMessage }}
        </template>
      </el-table-column>
      <el-table-column label="新版本固件" min-width="160" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.currentVersion }}
        </template>
      </el-table-column> -->
      <el-table-column label="操作" min-width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleUpdate(scope.row)">发布更新</el-button>
          <el-button size="mini" type="primary" @click="handleAuthority(scope.row)">编辑</el-button>
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
import { getProductList, addProduct } from '@/api/dealer'
import { validNoEmpty } from '@/utils/validate'
export default {
  filters: {
    momentStamp(timestamp) {
      return momentStampFormat(timestamp)
    }
  },
  // 引入组件
  components: {
  },
  data() {
    return {
      fileList: [],
      formLabelWidth: '130px',
      list: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogFormVisible: false,
      dialogStatus: '新增固件',
      form: {
        customerId: null,
        mainImg: '',
        productName: '',
        productCode: '',
        deviceVersion: '',
        fileCrcSize: '',
        updateUrl: '',
        versionMessage: '',
        updateMessage: ''
      },
      listQuery: {
        authority3: this.$store.state.user.authority.authority3.join(','),
        productName: '',
        limit: 50,
        sEcho: 1,
        sortCol: 'productId',
        sortDir: 'asc',
        start: 0
      },
      rules: {
        productName: validNoEmpty,
        updateUrl: validNoEmpty,
        deviceVersion: validNoEmpty,
        productCode: validNoEmpty
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
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getProductList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.rows
        this.totalQuantity = response.total
      })
    },
    search(name) {
      this.listQuery.productName = this.searchVal
      this.fetchData()
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
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
      this.dialogStatus = '新增固件'
      this.dialogFormVisible = true
    },
    handleUpdate: function(params) {

    },
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addProduct(this.form).then(response => {
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
    // submitUpload() {
    //   this.$refs.upload.submit()
    // },
    handleSuccess(file) {
      this.form.updateUrl = process.env.BASE_API + file.msg
    }
  }
}
</script>

<style>
.el-dialog{width:80%}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-pagination {
  text-align: center;
  margin-top: 2em;
}
.el-checkbox{}
.el-table td, .el-table th{
  padding:16px 0
}
</style>
