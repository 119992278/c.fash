<template>
  <div class="app-container">
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">{{ $t('table.newAdd') }}</el-button>
    <el-input v-model="searchVal" :placeholder="$t('table.inputQuery')" style="width: 200px;" class="filter-item" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
    <el-dialog :title="dialogStatus" :visible.sync="dialogUrlVisible" center modal show-close top="3vh" width="40%">
      <el-form ref="dataUrlForm" :model="versionTemp" :rules="rules">
        <el-form-item :label-width="formLabelWidth" :label="$t('table.appName')" prop="appName">
          <el-input v-model="versionTemp.appName" disabled/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.upgradeAddress')" prop="updateUrl">
          <el-input v-model="versionTemp.updateUrl"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.version')" prop="appVersion">
          <el-input v-model="versionTemp.appVersion"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.updateDescriprion')" prop="updateMessage">
          <el-input v-model="versionTemp.updateMessage"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.jumpKey')" prop="jumpKey">
          <el-input v-model="versionTemp.jumpKey" >
            <template slot="prepend">https://d.fashioncomm.com/download/dl.html?g=</template>
          </el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.connectUrl')" prop="connectUrl">
          <el-input v-model="versionTemp.connectUrl"/>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" align="right">
        <el-button @click="dialogUrlVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="handleData">{{ $t('table.save') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="3vh" width="80%">
      <el-form ref="dataForm" :model="temp" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="App Icon:" prop="customerAccount">
          <el-upload
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarSuccess"
            class="avatar-uploader"
            accept="image/gif, image/jpeg, image/png"
            action="">
            <img v-if="temp.imageUrl" :src="temp.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.appName')" prop="appChineseName">
          <el-input v-model="temp.appChineseName"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="App Key:">
          <el-input v-model="temp.appKey" disabled=""/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.appDesc')" prop="aboutUsChinese">
          <el-input v-model="temp.aboutUsChinese"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.agency')">
          <el-select v-model="temp.customerId" :placeholder="$t('table.pleaseSelectApp')" filterable @change="setcustomerCode">
            <el-option v-for="item in customerList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.supportDevice')">
          <el-checkbox-group v-model="productId" size="small">
            <el-checkbox v-for="(item,index) in productList" :label="item.value" :key="index" border>{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.supportWatchFace')">
          <el-checkbox-group v-model="watchFaceId" size="small" >
            <el-checkbox v-for="(item,index) in watchFaceList" :label="item.watchFaceId" :key="index" border>{{ item.watchFaceName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
          <el-button v-if="dialogStatus=='新增' + tempName" type="primary" @click="createData">新增</el-button>
          <el-button v-else type="primary" @click="updateData">{{ $t('table.edit') }}</el-button>
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
      <el-table-column label="更新时间" width="180px" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.insertTimeIos }}
        </template>
      </el-table-column>
      <el-table-column label="App名称" min-width="130" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.appChineseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前IOS版本" width="210" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.appVersionIos }}
        </template>
      </el-table-column>
      <el-table-column label="IOS更新内容" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.updateMessageIos }}
        </template>
      </el-table-column>
      <el-table-column label="当前andriod版本" width="210" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.appVersionAndroid }}
        </template>
      </el-table-column>
      <el-table-column label="andriod更新内容" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.updateMessageAndroid }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="更新内容" min-width="150" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          (ios){{ scope.row.updateMessageIos }} - (android){{ scope.row.updateMessageAndroid }}
        </template>
      </el-table-column> -->
      <el-table-column label="更新操作" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-edit" type="success" @click="handleOpen(scope.row,'iphone')">IOS</el-button>
          <el-button size="small" icon="el-icon-edit" type="primary" @click="handleOpen(scope.row,'android')">Android</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column label="发布新版本" min-width="180" align="center">
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="handleOpen(scope.row)">IOS</el-button>
          <el-button size="small" type="primary" @click="handleOpen(scope.row)">Android</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { getToken, getCookie } from '@/utils/auth'
import { momentStampFormat } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import { getAPPList, addProduct, addApp, getListCustomer, getProductList, getWatchFaceList, getVersionById, addAppVersion, getAPPById, updateApp } from '@/api/dealer'
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
      tempName: 'APP',
      productId: [],
      productList: [],
      watchFaceId: [],
      watchFaceList: [],
      customerList: [],
      formLabelWidth: '130px',
      list: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogUrlVisible: false,
      dialogFormVisible: false,
      dialogStatus: '新增' + this.tempName,
      versionTemp: {
        appId: '',
        appName: '',
        appVersion: '',
        clientType: '',
        connectUrl: '',
        fileCrcSize: 99,
        invalidStatus: 1,
        jumpKey: '',
        updateMessage: '',
        updateUrl: ''
      },
      temp: {
        imageUrl: '',
        productId: '',
        appChineseName: '',
        watchFaceIdStr: '',
        aboutUsEnglish: null,
        clientType: null,
        currentVersion: null,
        newVersion: null,
        aboutUsChinese: '',
        appKey: ''
      },
      listQuery: {
        authority2: this.$store.state.user.authority.authority2 ? this.$store.state.user.authority.authority2.join(',') : '',
        appChineseName: '',
        limit: 10,
        sEcho: 1,
        sortCol: 'productId',
        sortDir: 'asc',
        start: 0
      },
      rules: {
        appName: isvalidNoEmpty,
        updateUrl: isvalidNoEmpty,
        appVersion: isvalidNoEmpty,
        updateMessage: isvalidNoEmpty,
        jumpKey: isvalidNoEmpty,
        connectUrl: isvalidNoEmpty,
        customerName: isvalidNoEmpty,
        aboutUsChinese: isvalidNoEmpty,
        appChineseName: isvalidNoEmpty
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
      const _this = this
      if (val === false) {
        this.$refs['dataForm'].resetFields()
        this.productList = []
        this.customerList = []
        this.temp.imageUrl = ''
        this.resetTemp()
      } else {
        getProductList({ limit: 1000, start: 0 }).then(response => {
          response.rows.map(function(value1, index, arr) {
            _this.productList.push({ value: String(value1.productId), label: value1.productName })
          })
        })
        getWatchFaceList(this.temp).then(response => {
          this.watchFaceList = response.rows
        })
        getListCustomer(this.temp).then(response => {
          response.rows.map(function(value1, index, arr) {
            _this.customerList.push({ value: String(value1.customerId), code: value1.customerCode, label: value1.customerName })
          })
        })
      }
    },
    dialogUrlVisible: function(val) {
      if (val === false) {
        this.$refs['dataUrlForm'].resetFields()
        this.resetVersionTemp()
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAPPList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.rows
        this.totalQuantity = response.total
      })
    },
    resetTemp() {
      this.temp = {
        imageUrl: '',
        productId: '',
        appChineseName: '',
        watchFaceIdStr: '',
        aboutUsEnglish: null,
        clientType: null,
        currentVersion: null,
        newVersion: null,
        aboutUsChinese: '',
        appKey: ''
      }
    },
    resetVersionTemp() {
      this.versionTemp = {
        appId: '',
        appName: '',
        appVersion: '',
        clientType: '',
        connectUrl: '',
        fileCrcSize: 99,
        invalidStatus: 1,
        jumpKey: '',
        updateMessage: '',
        updateUrl: ''
      }
    },
    handleOpen(row, style) {
      this.dialogStatus = '编辑'
      const id = style === 'iphone' ? row.ios : row.android
      if (id) {
        getVersionById(id).then(response => {
          this.versionTemp = Object.assign({}, response.data)
          this.versionTemp.appName = row.appChineseName
        })
      } else {
        this.versionTemp.appId = row.appId
        this.versionTemp.clientType = style
        this.versionTemp.appName = row.appChineseName
      }
      this.dialogUrlVisible = true
    },
    handleData() {
      addAppVersion(this.versionTemp).then(response => {
        Message({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2 * 1000
        })
        this.dialogUrlVisible = false
        this.fetchData()
      })
    },
    search(name) {
      this.listQuery.appChineseName = this.searchVal
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
      const _this = this
      this.dialogStatus = '新增' + this.tempName
      this.dialogFormVisible = true
      // this.temp.customerId = '0'
    },
    handleUpdate: function(row) {
      this.dialogStatus = '编辑' + this.tempName
      getAPPById(row.appId).then(response => {
        this.dialogFormVisible = true
        this.temp = Object.assign({}, response.data)
        this.temp.imageUrl = this.temp.appIcon
        this.productId = this.temp.productId.split(',')
        this.temp.customerId = String(this.temp.customerId)
      })
    },
    setcustomerCode: function(val) {
      this.temp.customerCode = val
    },
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.productId = this.productId.join(',')
          this.temp.watchFaceIdStr = this.watchFaceId.join(',')
          addApp(this.temp).then(response => {
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

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.productId = this.productId.join(',')
          this.temp.watchFaceIdStr = this.watchFaceId.join(',')
          updateApp(this.temp).then(response => {
            this.dialogFormVisible = false
            this.fetchData()
            Message({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2 * 1000
            })
          })
        }
      })
    },
    handleAvatarSuccess(file, fileList) {
      var _this = this
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function(e) {
        _this.temp.imageUrl = this.result
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-pagination {
  text-align: center;
  margin-top: 2em;
}
</style>
