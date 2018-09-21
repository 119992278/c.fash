<template>
  <div class="dashboard-editor-container">
    <PanelGroup @handleSetLineChartData="handleSetLineChartData"/>
    <LineChart :xdata="xdata" :chart-data1="lineChartData"/>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="6">
        <PieChart/>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <SexChart/>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <RaddarChart/>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <BarChart/>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import SexChart from './components/SexChart'
import BarChart from './components/BarChart'
import dayjs from 'dayjs'
import { getToken, getCookie } from '@/utils/auth'
import { getdynamicDate, cleanCustomerId } from '@/utils/index'
import { getCountRegUser, getCountBindUser } from '@/api/dealer'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    SexChart
  },
  data() {
    return {
      lineChartData: [],
      tdata: new Date(),
      xdata: [],
      listQuery: {
        customerId: cleanCustomerId(getCookie('customerId')),
        endTime: dayjs().add(0, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss'),
        queryType: 3,
        startTime: dayjs().add(0, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.xdata = getdynamicDate(this.tdata)
    this.fetchData()
  },
  mounted() {},
  methods: {
    fetchData() {
      getCountRegUser(this.listQuery).then(response => {
        const _tempYdata = []
        response.rows.map(function(value, key, arr) {
          _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.xdata.map(function(value, key, arr) {
          const dayD = dayjs().format('D')
          if (key < dayD) {
            _tempYdata[key] = _tempYdata[key] === undefined ? 0 : _tempYdata[key]
          }
        })
        this.lineChartData = _tempYdata
      })
      getCountBindUser(this.listQuery).then(response => { // 做到这里了

      })
    },
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
