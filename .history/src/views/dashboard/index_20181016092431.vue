<template>
  <div class="dashboard-editor-container">
    <PanelGroup @handleSetLineChartUserData="handleSetLineChartUserData"/>
    <LineChart :xdata="xdata" :chart-data1="lineChartUserData" :chart-data2="lineChartBindData"/>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <PieChart/>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <SexChart/>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="6">
        <RaddarChart/>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <BarChart/>
      </el-col> -->
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
import { getdynamicDate, cleanCustomerId, sleep } from '@/utils/index'
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
      lineChartUserData: [],
      lineChartBindData: [],
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
    async fetchData() {
      await getCountRegUser(this.listQuery).then(response => {
        const _lineChartUserData = []
        response.rows.map(function(value, key, arr) {
          _lineChartUserData[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.xdata.map(function(value, key, arr) {
          const dayD = dayjs().format('D')
          if (key < dayD) {
            _lineChartUserData[key] = _lineChartUserData[key] === undefined ? 0 : _lineChartUserData[key]
          }
        })
        this.lineChartUserData = _lineChartUserData
      })
      await getCountBindUser(this.listQuery).then(response => {
        const _lineChartBindData = []
        response.rows.map(function(value, key, arr) {
          _lineChartBindData[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.xdata.map(function(value, key, arr) {
          const dayD = dayjs().format('D')
          if (key < dayD) {
            _lineChartBindData[key] = _lineChartBindData[key] === undefined ? 0 : _lineChartBindData[key]
          }
        })
        this.lineChartBindData = _lineChartBindData
      })
    },
    handleSetLineChartUserData(type) {
      // this.lineChartUserData = lineChartUserData[type]
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
