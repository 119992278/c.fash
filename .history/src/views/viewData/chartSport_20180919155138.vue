<template>
  <div class="app-container">
    <el-input v-model="customerCode" style="width: 200px;" class="filter-item" placeholder="请输入需要查询账户"/>
    <el-date-picker
      v-model="time"
      style="width: 500px;"
      type="daterange"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="changplace"/>
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
      <el-table-column label="账号" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ customerCode }}
        </template>
      </el-table-column>
      <el-table-column label="步数" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.step }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消耗(卡路里)" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.calorie }}</span>
        </template>
      </el-table-column>
      <el-table-column label="距离(米)" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.distance }}</span>
        </template>
      </el-table-column>
      <el-table-column label="运动时长(分钟)" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.duration }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位(天*时/周*星期/月*天)" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.unitFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleUpdate(scope.row)">查看睡眠数据</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { getToken, getCookie } from '@/utils/auth'
import { momentStampFormat } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import dayjs from 'dayjs'
import { getSportList } from '@/api/dealer'
import { isvalidNoEmpty, isvalidURL } from '@/utils/validate'
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
      time: '',
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogFormVisible: false,
      customerCode: '',
      temp: {
        imageUrl: '',
        productId: '',
        appChineseName: ''
      },
      listQuery: {
        accountId: '',
        customerCode: 'appscomm',
        deviceId: '',
        endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        queryType: '1',
        startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      },
      rules: {
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
  },
  created() {
    this.listLoading = false
    // this.fetchData()
  },
  methods: {
    fetchData() {
      this.listQuery.accountId = this.customerCode
      if (this.listQuery.accountId !== '') {
        this.listLoading = true
        getSportList(this.listQuery).then(response => {
          this.listLoading = false
          this.list = response.rows
          this.totalQuantity = response.total
        })
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
    changplace(val) {
      this.listQuery.startTime = dayjs(val[0]).startOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.listQuery.endTime = dayjs(val[1]).endOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.fetchData()
    },
    handleUpdate() {

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
.container{
  width:80%;margin:0 auto;
  .el-range-editor.el-input__inner{width:90%}
}
</style>
