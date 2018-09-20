<template>
  <div class="chart-container">
    <div class="container">
      <el-row>
        <el-col :span="6">
          <el-input v-model="customerCode" placeholder="请输入需要查询账户"/>
        </el-col>
        <el-col :span="18">
          <el-date-picker
            v-model="time"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changplace"/>
        </el-col>
      </el-row>
    </div>
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
      <el-table-column label="序号" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      <el-table-column label="账号" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      <el-table-column label="步数" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.step }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Chart from '@/components/Charts/maxChart'
import { getSportList } from '@/api/dealer'
export default {
  name: 'MaxChart',
  components: {
    Chart
  },
  data() {
    return {
      tdata: new Date(),
      customerCode: 'yingmu94@qq.com',
      xdata: [],
      ydata: [],
      title: '当月激活数',
      time: '',
      listQuery: {
        accountId: 'yingmu94@qq.com',
        customerCode: 'appscomm',
        deviceId: '',
        endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        queryType: '1',
        startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getSportList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.rows
      })
    },
    changplace(val) {
      this.listQuery.startTime = dayjs(val[0]).startOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.listQuery.endTime = dayjs(val[1]).endOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.fetchData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.chart-container{
  text-align: center;
  .container{
    width:80%;margin:0 auto;
    .el-range-editor.el-input__inner{width:90%}
  }
}
</style>

