<template>
  <div class="app-container">
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">新增</el-button>
    <el-input v-model="searchVal" style="width: 200px;" class="filter-item" placeholder="请输入需要查询" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
    <el-dialog :title="dialogStatus" :visible.sync="dialogHardwareFormVisible" center modal show-close top="3vh" width="70%">
      <el-form ref="dataForm" :model="temp" :rules="rules" >
        <el-form-item :label-width="formLabelWidth" label="名字:" prop="productName">
          <el-input v-model="temp.productName" disabled/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="编号:" prop="productName">
          <el-input v-model="temp.productCode" disabled/>
        </el-form-item>
        <!-- <el-table :data="gridData">
          <el-table-column property="versionId" label="版本号" align="center" width="100"/>
          <el-table-column property="firmwareType" label="Name" align="center" width="100"/>
          <el-table-column property="deviceVersion" label="deviceVer" align="center" width="100"/>
          <el-table-column property="buildVersion" label="buildVer" align="center" width="100"/>
          <el-table-column property="updateUrl" label="updateUrl" align="center" width="300" show-overflow-tooltip/>
          <el-table-column property="md5" label="md5" width="300" align="center" show-overflow-tooltip/>
          <el-table-column property="byforce" label="强制升级"/>
        </el-table> -->
        <el-table :data="gridData">
          <el-table-column label="版本号" align="center" min-width="90" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.versionId"/>
            </template>
          </el-table-column>
          <el-table-column label="Name" align="center" min-width="90" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.firmwareType"/>
            </template>
          </el-table-column>
          <el-table-column label="deviceVer" align="center" min-width="90" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.deviceVersion"/>
            </template>
          </el-table-column>
          <el-table-column label="buildVer" align="center" min-width="90" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.buildVersion"/>
            </template>
          </el-table-column>
          <el-table-column label="updateUrl" align="center" min-width="300" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.updateUrl"/>
            </template>
          </el-table-column>
          <el-table-column label="md5" align="center" min-width="300" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-input v-model="scope.row.md5"/>
            </template>
          </el-table-column>
          <el-table-column label="上传固件" align="center" min-width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-upload
                ref="upload"
                :headers="myHeaders"
                :on-success = "uploadhandleOnSuccess(scope.row)"
                :file-list="fileList"
                :auto-upload="true"
                :show-file-list="false"
                :action="uploadAction"
                accept=".zip"
                class="upload-demo">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
            </template>
          </el-table-column>
          <el-table-column label="强制升级" align="center" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.byforce"
                active-color="#13ce66"
                inactive-color="#DCDFE6"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="220">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.$index)">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div class="dialog-footer" align="right">
        <el-button @click="dialogHardwareFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addDialogHardwareForm">新增一行</el-button>
        <!-- <el-button type="primary">编辑</el-button> -->
      </div>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="3vh" width="60%">
      <el-form ref="dataForm" :model="temp" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="上传固件:" prop="customerAccount">
          <el-upload
            ref="upload"
            :headers="myHeaders"
            :on-success = "uploadhandleSuccess"
            :file-list="fileList"
            :auto-upload="true"
            :show-file-list="false"
            :action="uploadAction"
            accept=".zip"
            class="upload-demo">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button> (只能上传zip文件，且不超过800kb)
          </el-upload>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="名字:" prop="productName">
          <el-input v-model="temp.productName"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="编号:" prop="productCode">
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
      <el-table-column label="固件名称" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="固件编号" width="110" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="link-type" @click="handleHardwareForm(scope.row)">{{ scope.row.productCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前固件版本" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.currentVersion }}
        </template>
      </el-table-column>
      <el-table-column label="新版本固件" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.currentVersion }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" min-width="160" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.updateTime |momentStamp }}
        </template>
      </el-table-column>
      <el-table-column label="更新内容" min-width="160" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.updateMessage }}
        </template>
      </el-table-column>
      <el-table-column label="固件功能" min-width="160" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.versionMessage }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" align="center">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.currentVersion === scope.row.newVersion" size="small" type="success" @click="handleOpen(scope.row)">发布更新</el-button>
          <el-button size="small" icon="el-icon-edit" type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
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
import { getProductList, addProduct, getHardwareVersion, getproductInfo, editProductInfo, pullOffVersion } from '@/api/dealer'
import { isvalidNoEmpty } from '@/utils/validate'
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
      tempName: '固件',
      fileList: [],
      uploadAction: process.env.BASE_API + '/dealer/upload',
      formLabelWidth: '130px',
      list: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogHardwareFormVisible: false,
      dialogFormVisible: false,
      dialogStatus: '新增' + this.tempName,
      gridData: [],
      temp: {
        customerId: null,
        shelveFlag: '',
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
        authority3: this.$store.state.user.authority.authority3 ? this.$store.state.user.authority.authority3.join(',') : '',
        productName: '',
        limit: 50,
        sEcho: 1,
        sortCol: 'productId',
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
        this.resetTemp()
      }
    },
    dialogHardwareFormVisible: function(val) {
      if (val === false) {
        this.resetTemp()
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
    deleteRow(index, rows) {
      this.gridData.splice(index)
    },
    resetTemp() {
      this.temp = {
        customerId: null,
        shelveFlag: '',
        mainImg: '',
        productName: '',
        productCode: '',
        deviceVersion: '',
        fileCrcSize: '',
        updateUrl: '',
        versionMessage: '',
        updateMessage: ''
      }
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
      getproductInfo(row.productId).then(response => {
        this.dialogFormVisible = true
        this.temp = Object.assign({}, response.data)
        this.temp.deviceVersion = response.data.newVersion
      })
    },
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addProduct(this.temp).then(response => {
            this.dialogFormVisible = false
            this.fetchData()
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
    addDialogHardwareForm() {
      this.gridData.push({})
    },
    updateData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          editProductInfo(this.temp).then(response => {
            this.dialogFormVisible = false
            this.fetchData()
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
    handleHardwareForm(row) {
      getHardwareVersion(row.productId).then(response => {
        this.dialogHardwareFormVisible = true
        this.temp = Object.assign({}, response.data)
        this.dialogStatus = this.temp.productCode
        this.gridData = response.resMap.list
      })
    },
    handleOpen(row) {
      this.$confirm('确定发布新版本' + row.newVersion + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pullOffVersion({ versionId: parseInt(row.productId) }).then(response => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
        })
      }).catch(() => {
      })
    },
    uploadhandleSuccess(file) {
      this.temp.updateUrl = process.env.BASE_API + file.msg
    },
    uploadhandleOnSuccess(file) {
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
