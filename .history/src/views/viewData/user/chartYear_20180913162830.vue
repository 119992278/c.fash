<template>
  <div class="chart-container">
    <chart id="year" :xdata="xdata" :ydata="ydata" :title="title" height="104%" width="100%"/>
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
      title: '当月注册数',
      listQuery: {
        customerId: null,
        endTime: moment().add('year', 0).endOf('year').format('YYYY-MM-DD HH:mm:ss'),
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
      getCountRegUser(this.listQuery).then(response => {
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
    },
    changeDatePicker() {
      this.listQuery.startTime = moment(this.tdata).startOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.listQuery.endTime = moment(this.tdata).endOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.fetchData()
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

