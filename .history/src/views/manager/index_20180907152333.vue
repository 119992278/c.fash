<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      :row-class-name="tableRowClassName"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="账号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerAccount }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.customerType | customerTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" min-width="130" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.customerName }}
        </template>
      </el-table-column>
      <el-table-column label="公司编号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerCode }}
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.contactUser }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.insertTime }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.auditStatus | auditStatusFilter }}
        </template>
      </el-table-column>
      <el-table-column label="App" min-width="180" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.appName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status!='published'" size="mini" type="success" @click="handleModifyStatus(scope.row,'published')">编辑</el-button>
          <el-button v-if="scope.row.status!='draft'" size="mini" type="primary" @click="handleModifyStatus(scope.row,'draft')">授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <TablePagination
      :total-page="totalQuantity"
      @handle-CurrentChange="handleCurrentChange"
      @handle-SizeChange="handleSizeChange"/>
  </div>
</template>

<script>
import { getAccountList } from '@/api/dealer'
import TablePagination from '@/components/TablePagination/index'

export default {
  filters: {
    auditStatusFilter(status) {
      const statusMap = { 0: '审核通过' }
      return statusMap[status]
    },
    customerTypeFilter(status) {
      const statusMap = { 0: '经销商', 2: '管理者' }
      return statusMap[status]
    }
  },
  // 引入组件
  components: {
    TablePagination
  },
  data() {
    return {
      list: null,
      listLoading: true,
      pageCount: 10,
      pageIndex: 1,
      totalQuantity: 0,
      total: 0,
      listQuery: {
        customerAccount: '',
        limit: 20,
        sEcho: 1,
        sortCol: 'customerAccountId',
        sortDir: 'asc',
        start: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getAccountList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.rows
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    }
  }
}
</script>

<style>
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
</style>
