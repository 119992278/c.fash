<template>
  <div class="app-container">
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">新增</el-button>
    <el-input v-model="searchVal" style="width: 200px;" class="filter-item" placeholder="请输入需要查询的账户"/>
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
      <el-table-column label="更新时间" min-width="190" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.insertTimeIos }}
        </template>
      </el-table-column>
      <el-table-column label="App名称" min-width="130" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.appChineseName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="App当前版本" width="210" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag>ios: {{ scope.row.appVersionIos }}</el-tag>
          <el-tag>andriod: {{ scope.row.appVersionIos }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="App新版本" min-width="160" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">IOS</el-button>
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">安卓</el-button>
        </template>
      </el-table-column>
      <el-table-column label="更新内容" min-width="150" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          (ios):{{ scope.row.updateMessageIos }} - (android):{{ scope.row.updateMessageAndroid }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">IOS发布</el-button>
          <el-button v-if="scope.row.status!='draft'" size="mini" type="primary" @click="handleModifyStatus(scope.row,'draft')">安卓发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { momentStampFormat } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import { getAPPList } from '@/api/dealer'
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
        authority3: '1,2,5,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,38,40,42,44,45,46,47,48,49,50,53,55,61,80,87,99,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,121,126,129',
        customerAccount: '',
        limit: 10,
        sEcho: 1,
        sortCol: 'customerAccountId',
        sortDir: 'asc',
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
      getAPPList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.rows
        this.totalQuantity = response.total
      })
    },
    search(name) {
      this.listQuery.customerAccount = this.searchVal
      this.fetchData()
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
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
