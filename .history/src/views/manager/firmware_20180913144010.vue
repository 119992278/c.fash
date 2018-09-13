<template>
  <div class="app-container">
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleAdd">新增</el-button>
    <el-input v-model="searchVal" style="width: 200px;" class="filter-item" placeholder="请输入需要查询" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="3vh" width="70%">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="固件:" prop="customerAccount">
          <el-input v-model="form.customerAccount"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="编号:">
          <el-input v-model="form.customerAddress"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="版本号:">
          <el-input v-model="form.customerContact"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="升级地址:">
          <el-input v-model="form.customerCode"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="CRC:">
          <el-input v-model="form.customerName"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="更新说明:">
          <el-input v-model="form.customerEamil"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="固件功能:">
          <el-input v-model="form.contactUser"/>
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="createData">新增</el-button>
          <!-- <el-button v-if="dialogStatus=='新增会员'" type="primary" @click="createData">新增会员</el-button>
          <el-button v-else type="primary" @click="updateData">会员</el-button> -->
        </div>
      </el-form>
    </el-dialog>
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
      <el-table-column label="固件名称" min-width="160" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="固件编号" width="110" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.productCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前固件版本" min-width="160" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.currentVersion }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" width="110" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.updateTime |momentStamp }}
        </template>
      </el-table-column>
      <el-table-column label="更新内容" width="110" align="let" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.versionMessage }}
        </template>
      </el-table-column>
      <el-table-column label="新版本固件" min-width="160" align="left" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.currentVersion }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { momentStampFormat } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import { getProductList } from '@/api/dealer'
import { validNoEmpty } from '@/utils/validate'
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
        productName: '',
        limit: 10,
        sEcho: 1,
        sortCol: 'productId',
        sortDir: 'asc',
        start: 0
      },
      rules: {
        contactUser: validNoEmpty,
        customerPassword: validNoEmpty
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
    search(name) {
      this.listQuery.productName = this.searchVal
      this.fetchData()
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
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
      this.dialogStatus = '新增固件'
      this.form.customerType = '1'
      this.form.sex = '0'
      this.form.authoList = []
      this.dialogFormVisible = true
    },
    handleUpdate: function(params) {

    },
    createData: function() {

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
