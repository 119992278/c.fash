<template>
  <div class="app-container">
    <el-input v-model="searchVal" :placeholder="$t('table.inputQuery')" style="width: 200px;" class="filter-item" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
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
      <el-table-column :label="$t('login.username')" min-width="120" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.accountId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.appName')" min-width="120" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.appName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.userRole')" min-width="260" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import i18n from '@/lang'
import { momentStampFormat, cleanCustomerId } from '@/utils/index'
import { getToken, getCookie } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'
import { getUserRoleList } from '@/api/dealer'
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
      fileList: [],
      formLabelWidth: '130px',
      list: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      listQuery: {
        accountId: '',
        appId: '',
        customerId: cleanCustomerId(getCookie('customerId')),
        limit: 20,
        sEcho: 1,
        sortDir: 'desc',
        start: 0
      }
    }
  },
  computed: {
  },
  created() {
    this.fetchData()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      }
    },
    fetchData() {
      this.listLoading = true
      getUserRoleList(this.listQuery).then(response => {
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
