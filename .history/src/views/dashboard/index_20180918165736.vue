<template>
  <div class="dashboard-editor-container">
    <PanelGroup @handleSetLineChartData="handleSetLineChartData"/>
    <LineChart :xdata="xdata" :ydata="lineChartData"/>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="6">
        <RaddarChart/>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <PieChart/>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <BarChart/>
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
import BarChart from './components/BarChart'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
import dayjs from 'dayjs'
import { getCountActivityUser, getCountBindUser } from '@/api/dealer'
export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      // lineChartData: [],
      tdata: new Date(),
      xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      ydata: [],
      listQuery: {
        customerId: null,
        endTime: dayjs().add(0, 'year').endOf('year').format('YYYY-MM-DD HH:mm:ss'),
        queryType: 2,
        startTime: dayjs().add(0, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  methods: {
    fetchData() {
      getCountActivityUser(this.listQuery).then(response => {
        const _tempYdata = []
        response.rows.map(function(value, key, arr) {
          _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.lineChartData['expectedData'] = _tempYdata
      })
      getCountBindUser(this.listQuery).then(response => {
        const _tempYdata = []
        response.rows.map(function(value, key, arr) {
          _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.lineChartData['actualData'] = _tempYdata
      })
    },
    handleSetLineChartData(type) {
      console.log(JSON.stringify(lineChartData[type]))
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
