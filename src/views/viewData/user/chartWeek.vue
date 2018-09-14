<template>
  <div class="chart-container">
    <chart id="week" :xdata="xdata" :ydata="ydata" :title="title" height="104%" width="100%"/>
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
      title: '当周注册数',
      listQuery: {
        customerId: null,
        endTime: moment().add('month', 0).endOf('month').format('YYYY-MM-DD HH:mm:ss'), // 做到这里了!
        queryType: 1,
        startTime: moment().add('month', -2).startOf('month').format('YYYY-MM-DD HH:mm:ss')
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

</style>

