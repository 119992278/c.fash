<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="全部" name="all">
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
          <el-table-column label="联系人" min-width="50" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提问时间" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.insterTime |momentStamp }}
            </template>
          </el-table-column>
          <el-table-column label="问题" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.opiNion }}</span>
            </template>
          </el-table-column>
          <el-table-column label="答复" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.feedBackAnswer | feedBackAnswerStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.feedBackAnswer === null" size="mini" type="success" @click="scope.row.edit=!scope.row.edit">答复</el-button>
              <el-button v-else size="mini" type="success" disabled>已答复</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </el-tab-pane>
      <el-tab-pane label="已回复" name="call">
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
          <el-table-column label="联系人" min-width="50" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提问时间" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.insterTime |momentStamp }}
            </template>
          </el-table-column>
          <el-table-column label="问题" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.opiNion }}</span>
            </template>
          </el-table-column>
          <el-table-column label="答复" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.feedBackAnswer | feedBackAnswerStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.feedBackAnswer === null" size="mini" type="success" @click="scope.row.edit=!scope.row.edit">答复</el-button>
              <el-button v-else size="mini" type="success" disabled>已答复</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </el-tab-pane>
      <el-tab-pane label="未回复" name="nocall">
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
          <el-table-column label="联系人" min-width="50" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提问时间" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.insterTime |momentStamp }}
            </template>
          </el-table-column>
          <el-table-column label="问题" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.opiNion }}</span>
            </template>
          </el-table-column>
          <el-table-column label="答复" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.feedBackAnswer | feedBackAnswerStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.feedBackAnswer === null" size="mini" type="success" @click="scope.row.edit=!scope.row.edit">答复</el-button>
              <el-button v-else size="mini" type="success" disabled>已答复</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getToken, getCookie } from '@/utils/auth'
import { momentStampFormat } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import { getfeedBackList, addProduct, getHardwareVersion, getproductInfo, editProductInfo } from '@/api/dealer'
import { isvalidNoEmpty, isvalidURL } from '@/utils/validate'
export default {
  filters: {
    momentStamp(timestamp) {
      return momentStampFormat(timestamp)
    },
    feedBackAnswerStatus(arr) {
      if (arr != null) {
        return arr[0].answer
      } else {
        return '暂无回复'
      }
    }
  },
  // 引入组件
  components: {
  },
  data() {
    return {
      tempName: '反馈',
      activeName: 'all',
      fileList: [],
      formLabelWidth: '130px',
      list: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogFormVisible: false,
      temp: {
        imageUrl: '',
        productId: '',
        appChineseName: ''
      },
      listQuery: {
        answerStauts: null,
        answerType: 0,
        customerId: null,
        insterTime: null,
        opiNion: null,
        params: {
          startIndex: 0,
          maxCount: 20
        },
        userInfoId: null
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
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getfeedBackList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.feedBack
        this.totalQuantity = response.total
      })
    },
    resetTemp() {
      this.temp = {
        imageUrl: '',
        productId: '',
        appChineseName: ''
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
      // this.dialogStatus = '编辑' + this.tempName
      // getproductInfo(row.productId).then(response => {
      //   this.dialogFormVisible = true
      //   this.temp = Object.assign({}, response.data)
      //   this.temp.deviceVersion = response.data.newVersion
      // })
    },
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addProduct(this.temp).then(response => {
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
          editProductInfo(this.temp).then(response => {
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
    handleTabClick(tab, event) {
      console.log(JSON.stringify(tab))
      this.fetchData()
    },
    confirmEdit(row) {
      row.edit = false
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
