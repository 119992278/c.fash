<template>
  <div class="app-container">
    <el-input v-model="searchVal" :placeholder="$t('table.inputQuery')" style="width: 200px;" class="filter-item" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column :label="$t('table.serialNumber')" align="center" width="95" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="用户账号" min-width="180" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.accountId }}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" min-width="180" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.operationTime | momentStamp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作内容" min-width="180" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.operationContent }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { momentStampFormat, cleanCustomerId } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import { getHistoryList } from '@/api/dealer'
import { isvalidNoEmpty } from '@/utils/validate'
import { getToken, getCookie } from '@/utils/auth'
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
      formLabelWidth: '130px',
      list: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogFormVisible: false,
      dialogStatus: '新增会员',
      form: {
      },
      listQuery: {
        accountId: '',
        customerId: cleanCustomerId(getCookie('customerId')),
        limit: 20,
        sEcho: 1,
        sortCol: 'operationTime',
        sortDir: 'desc',
        start: 0
      },
      rules: {
        contactUser: isvalidNoEmpty,
        customerPassword: isvalidNoEmpty
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getHistoryList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.rows
        this.totalQuantity = response.total
      })
    },
    search(name) {
      this.listQuery.accountId = this.searchVal
      this.fetchData()
    },
    handleCurrentChange: function(page) {
      console.log('page1=' + page)
      if (this.listQuery.sEcho !== page) {
        this.listQuery.sEcho = page
        this.listQuery.start = page * 10 - 10
      }
      this.fetchData()
    },
    handleSizeChange: function(page) {
      console.log('page2=' + page)
      this.listQuery.limit = page
      this.listQuery.start = 0
      this.fetchData()
    },
    handleAdd: function(params) {
      this.dialogStatus = 'create'
      this.form.customerType = '1'
      this.form.sex = '0'
      this.form.authoList = []
      this.dialogFormVisible = true
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
