<template>
  <div class="chart-container">
    <div class="container">
      <el-row>
        <el-col :span="6">
          <el-input v-model="customerCode" placeholder="请输入需要查询账户"/>
        </el-col>
        <el-col :span="18">
          <el-date-picker
            v-model="value7"
            :picker-options="pickerOptions2"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-col>
      </el-row>
    </div>
    <chart id="year" :xdata="xdata" :ydata="ydata" :title="title" height="98%" width="100%"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Chart from '@/components/Charts/mixChart'
import { getdynamicDate } from '@/utils/index'
import { getSportList } from '@/api/dealer'
export default {
  name: 'MixChart',
  components: {
    Chart
  },
  data() {
    return {
      tdata: new Date(),
      customerCode: '',
      xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      ydata: [],
      title: '当月激活数',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value6: '',
      value7: '',
      listQuery: {
        accountId: 'yingmu94@qq.com',
        customerCode: 'appscomm',
        deviceId: '',
        endTime: '2018-09-19 23:59:59',
        queryType: '1',
        startTime: '2016-09-19 00:00:00'
        // customerId: null,
        // endTime: dayjs().add(0, 'year').endOf('year').format('YYYY-MM-DD HH:mm:ss'),
        // queryType: 2,
        // startTime: dayjs().add(0, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const _this = this
      getSportList(this.listQuery).then(response => {
        const _tempYdata = []
        const index = 1
        response.rows.map(function(value, key, arr) {
          _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.ydata = _tempYdata
      })
    },
    findSportList() {
      this.listQuery.startTime = dayjs(this.tdata).startOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.listQuery.endTime = dayjs(this.tdata).endOf('year').format('YYYY-MM-DD HH:mm:ss')
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
    .el-input{width:100%}
  }
}
</style>

