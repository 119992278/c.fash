<template>
  <div class="chart-container">
    <div class="dashboard-editor-container">
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
    <el-date-picker v-model="tdata" size="large" value-format="yyyy-MM" type="month" placeholder="选择月" @change="changeDatePicker"/>
    <chart id="day" :xdata="xdata" :ydata="ydata" :title="title" height="98%" width="100%"/>
  </div>
  <!-- <div class="chart-container">
    <el-date-picker v-model="tdata" size="large" value-format="yyyy-MM" type="month" placeholder="选择月" @change="changeDatePicker"/>
    <chart id="day" :xdata="xdata" :ydata="ydata" :title="title" height="98%" width="100%"/>
  </div> -->
</template>

<script>
import dayjs from 'dayjs'
import Chart from '@/components/Charts/mixChart'
import { getToken, getCookie } from '@/utils/auth'
import PanelGroup from '@/views/dashboard/components/PanelGroup'
import RaddarChart from '@/views/components/RaddarChart'
import PieChart from '@/views/components/PieChart'
import SexChart from '@/views/components/SexChart'
import BarChart from '@/views/components/BarChart'
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
      })
    },
    changeDatePicker() {
      this.xdata = getdynamicDate(this.tdata)
      this.listQuery.startTime = dayjs(this.tdata).startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.listQuery.endTime = dayjs(this.tdata).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.fetchData()
    }
  }
}
</script>

<style scoped>
</style>

