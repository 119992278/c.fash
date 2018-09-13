<template>
  <div class="chart-container">
    <el-date-picker
      v-model="value5"
      type="year"
      placeholder="选择年"/>
    <chart id="year" :xdata="xdata" :ydata="ydata" :title="title" height="104%" width="100%"/>
  </div>
</template>

<script>
import moment from 'moment'
import Chart from '@/components/Charts/mixChart'
import { getdynamicDate } from '@/utils/index'
import { getCountBindUser } from '@/api/dealer'
export default {
  name: 'MixChart',
  components: {
    Chart
  },
  data() {
    return {
      tdata: new Date(),
      xdata: [],
      ydata: [],
      title: '每年注册数',
      listQuery: {
        customerId: null,
        endTime: moment().add('year', 0).endOf('year').format('YYYY-MM-DD HH:mm:ss'), // 做到这里了!
        queryType: 2,
        startTime: moment().add('year', 0).startOf('year').format('YYYY-MM-DD HH:mm:ss')
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
          _tempXdata.push(index + '月')
          index++
          _tempYdata.push(parseInt(value.number))
        })
        this.xdata = _tempXdata
        this.ydata = _tempYdata
        console.log(this.xdata)
        console.log(this.ydata)
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

