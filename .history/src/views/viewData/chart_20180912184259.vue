<template>
  <div class="chart-container">
    <chart id="id" :xdata="xdata" :ydata1="ydata1" height="104%" width="100%"/>
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
      ydata1: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078],
      listQuery: {
        customerId: null,
        endTime: moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'),
        queryType: 3,
        startTime: moment().add('month').format('YYYY-MM')
      }
    }
  },
  created() {
    this.xdata = getdynamicDate()
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCountRegUser(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.rows
        this.totalQuantity = response.total
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

