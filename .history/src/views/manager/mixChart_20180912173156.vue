<template>
  <div class="chart-container">
    <chart id="id" :xdata="xdata" :ydata1="ydata1" height="102%" width="100%"/>
  </div>
</template>

<script>
import Chart from '@/components/Charts/mixChart2'
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
        endTime: '2018-08-31 23:59:59',
        queryType: 3,
        startTime: '2018-08-01 00:00:00'
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

