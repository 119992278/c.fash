<template>
  <div class="app-container">
    <el-input v-model="searchVal" style="width: 200px;" class="filter-item" placeholder="请输入需要查询的账户" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
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
      <el-table-column label="账号" min-width="130" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.accountId }}
        </template>
      </el-table-column>
      <el-table-column label="名称" min-width="110" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" min-width="130" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.sex | sexStamp }}
        </template>
      </el-table-column>
      <el-table-column label="身高CM" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row| heightStamp }}
        </template>
      </el-table-column>
      <el-table-column label="体重KG" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.weight | wegightStamp }}
        </template>
      </el-table-column>
      <el-table-column label="出生日期" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.birthday }}
        </template>
      </el-table-column>
      <el-table-column label="最近登录" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.loginTime | momentStamp }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { momentStampFormat } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import { getUserList } from '@/api/dealer'
import { isvalidNoEmpty } from '@/utils/validate'
export default {
  filters: {
    momentStamp(timestamp) {
      return momentStampFormat(timestamp)
    },
    sexStamp(status) {
      const statusMap = { 0: '男', 1: '女' }
      return statusMap[status]
    },
    heightStamp(status) {
      const _unit = status.heightUnit === 0 ? 'cm' : 'in'
      return status.height + '/' + _unit
    },
    wegightStamp(status) {
      const _unit = status.weightUnit === 0 ? 'kg' : 'lbs'
      return status + '/' + _unit
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
        limit: 10,
        sEcho: 1,
        sortCol: 'updateTime',
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
      getUserList(this.listQuery).then(response => {
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
