<template>
  <div class="chart-container">
    <div class="dashboard-editor-container">
      <PanelGroup @handleSetLineChartData="handleSetLineChartData"/>
    </div>
    <el-date-picker v-model="tdata" size="large" value-format="yyyy-MM" type="month" placeholder="选择月" @change="changeDatePicker"/>
    <chart id="day" :xdata="xdata" :ydata="ydata" :chart-load="chartLoad" :title="title" height="70%" width="100%"/>
  </div>
</template>

<script>
import PanelGroup from '@/views/dashboard/components/PanelGroup'
import dayjs from 'dayjs'
import Chart from '@/components/Charts/mixChart'
import { getToken, getCookie } from '@/utils/auth'
import { getdynamicDate, cleanCustomerId } from '@/utils/index'
import { getCountBindUser, getCountRegUser } from '@/api/dealer'
export default {
  name: 'MixChart',
  components: {
    Chart,
    PanelGroup
  },
  data() {
    return {
      tdata: new Date(),
      xdata: [],
      ydata: [],
      title: '每月注册数',
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
    this.xdata = getdynamicDate(this.tdata)
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const _this = this
      const bindUserResult = await getCountBindUser(this.listQuery)
      const _tempYdata = []
      bindUserResult.rows.map(function(value, key, arr) {
        _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
      })
      this.xdata.map(function(value, key, arr) {
        _tempYdata[key] = _tempYdata[key] === undefined ? 0 : _tempYdata[key]
      })
      this.ydata = _tempYdata
      this.chartLoad = false
      await getCountRegUser(this.listQuery).then(response => {
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
    changeDatePicker(select) {
      if (select) {
        this.chartLoad = true
        this.xdata = getdynamicDate(this.tdata)
        this.listQuery.startTime = dayjs(this.tdata).startOf('month').format('YYYY-MM-DD HH:mm:ss')
        this.listQuery.endTime = dayjs(this.tdata).endOf('month').format('YYYY-MM-DD HH:mm:ss')
        this.fetchData()
      }
    },
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style scoped>
</style>

