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
    <el-date-picker v-model="tdata" type="year" value-format="yyyy" placeholder="选择年" @change="changeDatePicker"/>
    <chart id="year" :xdata="xdata" :ydata="ydata" :chart-load="chartLoad" :title="title" height="55%" width="100%"/>
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
      xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      ydata: [],
      title: '当年活跃数',
      listQuery: {
        customerId: cleanCustomerId(getCookie('customerId')),
        endTime: dayjs().add(0, 'year').endOf('year').format('YYYY-MM-DD HH:mm:ss'),
        queryType: 2,
        startTime: dayjs().add(0, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.chartLoad = true
    this.fetchData()
  },
  methods: {
    fetchData() {
      const _this = this
      getCountActivityUser(this.listQuery).then(response => {
        const _tempYdata = []
        const index = 1
        response.rows.map(function(value, key, arr) {
          _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.ydata = _tempYdata
        this.chartLoad = false
      })
    },
    changeDatePicker(select) {
      if (select) {
        this.chartLoad = true
        this.listQuery.startTime = dayjs(this.tdata).startOf('year').format('YYYY-MM-DD HH:mm:ss')
        this.listQuery.endTime = dayjs(this.tdata).endOf('year').format('YYYY-MM-DD HH:mm:ss')
        this.fetchData()
      }
    }
  }
}
</script>

<style scoped>
</style>

