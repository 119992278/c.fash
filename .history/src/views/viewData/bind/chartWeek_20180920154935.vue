<template>
  <div class="chart-container">
    <chart id="week" :xdata="xdata" :ydata="ydata" :title="title" height="104%" width="100%"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Chart from '@/components/Charts/mixChart'
import { getToken, getCookie } from '@/utils/auth'
import { getdynamicDate } from '@/utils/index'
import { getCountBindUser } from '@/api/dealer'
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
        customerId: getCookie('customerId'),
        endTime: dayjs().add(0, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss'), // 做到这里了!
        queryType: 1,
        startTime: dayjs().add(-2, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const _this = this
      getCountBindUser(this.listQuery).then(response => {
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

