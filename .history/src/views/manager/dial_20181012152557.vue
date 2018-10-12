<template>
  <div class="app-container">
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">{{ $t('table.newAdd') }}</el-button>
    <el-input v-model="searchVal" :placeholder="$t('table.inputQuery')" style="width: 200px;" class="filter-item" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="3vh" width="40%">
      <el-form ref="dataForm" :model="temp" :rules="rules">
        <el-form-item :label-width="formLabelWidth" :label="$t('table.watchFaceUrrl')">
          <el-upload
            :auto-upload="false"
            :show-file-list="false"
            :on-change="handleAvatarSuccess"
            class="avatar-uploader"
            accept="image/gif, image/jpeg, image/png"
            action="">
            <img v-if="watchFaceUrl" :src="watchFaceUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.watchFaceName')" prop="watchFaceName">
          <el-input v-model="temp.watchFaceName"/>
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
          <el-button v-if="dialogStatus=='新增' + tempName" type="primary" @click="createData">{{ $t('table.newAdd') }}</el-button>
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
      <el-table-column :label="$t('table.watchFaceId')" min-width="95" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.watchFaceId }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.watchFaceUrrl')" min-width="110" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <img :src="scope.row.watchFaceUrl" width="80px" height="80px">
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.watchFaceName')" min-width="110" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.watchFaceName }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.updateTime |momentStamp }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" align="center">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.currentVersion !== scope.row.newVersion" icon="el-icon-edit" size="mini" type="success" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button size="mini" type="danger" icon="el-icon-close" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import i18n from '@/lang'
import { getToken, getCookie } from '@/utils/auth'
import { momentStampFormat } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import { getWatchFacelist, addWatchFace, delWatchFaceById, getwatchFaceById, editWatchFace } from '@/api/dealer'
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
      tempName: '表盘',
      fileList: [],
      formLabelWidth: '130px',
      list: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogFormVisible: false,
      dialogStatus: '新增' + this.tempName,
      watchFaceUrl: null,
      temp: {
        watchFaceId: null,
        watchFaceUrl: null,
        watchFaceName: null
      },
      listQuery: {
        authority2: this.$store.state.user.authority.authority2 ? this.$store.state.user.authority.authority2.join(',') : '',
        productName: '',
        limit: 50,
        sEcho: 1,
        sortCol: '"watchFaceName"',
        sortDir: 'asc',
        start: 0
      },
      rules: {
        watchFaceName: isvalidNoEmpty
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
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getWatchFacelist(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.rows
        this.totalQuantity = response.total
      })
    },
    resetTemp() {
      this.temp = {
        watchFaceName: null,
        watchFaceUrl: null,
        watchFaceId: null
      }
      this.watchFaceUrl = null
    },
    search(name) {
      this.listQuery.watchFaceName = this.searchVal
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
    handleDelete(row) {
      this.$confirm('确定删除 ' + row.watchFaceName + '?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: i18n.t('table.cancel'),
        type: 'warning'
      }).then(() => {
        delWatchFaceById({ watchFaceId: row.watchFaceId }).then(response => {
          this.fetchData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      })
    },
    handleUpdate: function(row) {
      this.dialogStatus = '编辑' + this.tempName
      getwatchFaceById(row.watchFaceId).then(response => {
        this.dialogFormVisible = true
        this.temp = Object.assign({}, response.data)
        this.watchFaceUrl = this.temp.watchFaceUrl
      })
    },
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.watchFaceUrl = this.watchFaceUrl.split('base64,')[1]
          addWatchFace(this.temp).then(response => {
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
          if (this.watchFaceUrl.includes('base64')) {
            this.temp.watchFaceUrl = this.watchFaceUrl.split('base64,')[1]
          } else {
            this.temp.watchFaceUrl = this.watchFaceUrl
          }
          editWatchFace(this.temp).then(response => {
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
    handleAvatarSuccess(file, fileList) {
      var _this = this
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function(e) {
        _this.watchFaceUrl = this.result
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
</style>
