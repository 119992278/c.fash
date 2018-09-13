<template>
  <div class="chart-container">
    <chart id="id" :xdata="xdata" :ydata="ydata" :title="title" height="104%" width="100%"/>
  </div>
</template>

<script>
import moment from 'moment'
import Chart from '@/components/Charts/mixChart'
import { getdynamicDate } from '@/utils/index'
import { getCountRegUser } from '@/api/dealer'
export default {
  name: 'MixChart',
  components: {
    Chart
  },
  data() {
    return {
      xdata: [],
      ydata: [],
      title: '每天注册数',
      listQuery: {
        customerId: null,
        endTime: moment().add('month', 0).endOf('month').format('YYYY-MM-DD HH:mm:ss'), // 做到这里了!
        queryType: 3,
        startTime: moment().add('month', 0).startOf('month').format('YYYY-MM-DD HH:mm:ss')
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
      getCountRegUser(this.listQuery).then(response => {
        // /this.ydata = [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078]
        const _tempYdata = []
        response.rows.map(function(value, key, arr) {
          _tempYdata[key] = parseInt(value.unitFormat)
        })
        console.log(_tempYdata)
        this.ydata = _tempYdata
      })
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

