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
          <span>{{ scope.row.customerType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司名称" width="110" align="center" show-overflow-tooltip>
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
          {{ scope.row.auditStatus }}
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
  </div>
</template>

<script>
import { getAccountList } from '@/api/dealer'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
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
      if (rowIndex === 1) {
        return 'warning-row11111111111111111111111'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
