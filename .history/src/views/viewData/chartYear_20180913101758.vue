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
      title: '每周注册数',
      listQuery: {
        customerId: null,
        endTime: moment().add('month', 0).endOf('month').format('YYYY-MM-DD HH:mm:ss'), // 做到这里了!
        queryType: 2,
        startTime: moment().add('year', -2).startOf('year').format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const _this = this
      getCountRegUser(this.listQuery).then(response => {
        const _tempXdata = []
        const _tempYdata = []
        let index = 1
        response.rows.map(function(value, key, arr) {
          _tempXdata.push('第' + index + '周')
          index++
          _tempYdata.push(parseInt(value.number))
        })
        // this.xdata.map(function(value, key, arr) {
        //   _tempYdata[key] = _tempYdata[key] === undefined ? 0 : _tempYdata[key]
        // })
        this.xdata = _tempXdata
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

