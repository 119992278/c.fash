<template>
  <div class="chart-container">
    <div class="dashboard-editor-container">
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
    <el-date-picker v-model="tdata" size="large" value-format="yyyy-MM" type="month" placeholder="选择月" @change="changeDatePicker"/>
    <chart id="day" :xdata="xdata" :ydata="ydata" :chart-load="chartLoad" :title="title" height="55%" width="100%"/>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import Chart from '@/components/Charts/mixChart'
import RaddarChart from '@/views/dashboard/components/RaddarChart'
import PieChart from '@/views/dashboard/components/PieChart'
import SexChart from '@/views/dashboard/components/SexChart'
import BarChart from '@/views/dashboard/components/BarChart'
import { getToken, getCookie } from '@/utils/auth'
import { getdynamicDate, cleanCustomerId } from '@/utils/index'
import { getCountActivityUser } from '@/api/dealer'
export default {
  name: 'MixChart',
  components: {
    Chart,
    RaddarChart,
    PieChart,
    BarChart,
    SexChart
  },
  data() {
    return {
      tdata: new Date(),
      chartLoad: false,
      xdata: [],
      ydata: [],
      title: '当天活跃数',
      listQuery: {
        customerId: cleanCustomerId(getCookie('customerId')),
        endTime: dayjs().add(0, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss'),
        queryType: 3,
        startTime: dayjs().add(0, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.chartLoad = true
    this.xdata = getdynamicDate()
    this.fetchData()
  },
  methods: {
    fetchData() {
      const _this = this
      getCountActivityUser(this.listQuery).then(response => {
        const _tempYdata = []
        response.rows.map(function(value, key, arr) {
          _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.xdata.map(function(value, key, arr) {
          _tempYdata[key] = _tempYdata[key] === undefined ? 0 : _tempYdata[key]
        })
        this.ydata = _tempYdata
        this.chartLoad = false
      })
    },
    changeDatePicker(select) {
      if (select) {
        this.chartLoad = true
        this.xdata = getdynamicDate(this.tdata)
        this.listQuery.startTime = dayjs(this.tdata).startOf('month').format('YYYY-MM-DD HH:mm:ss')
        this.listQuery.endTime = dayjs(this.tdata).endOf('month').format('YYYY-MM-DD HH:mm:ss')
        this.fetchData()
      }
    }
  }
}
</script>

<style scoped>
</style>

