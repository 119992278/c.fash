<template>
  <div class="chart-container">
    选择日期: <el-date-picker v-model="tdata" size="large" value-format="yyyy-MM" type="month" placeholder="选择月" @change="changeDatePicker"/>
    <chart id="day" :xdata="xdata" :ydata="ydata" :title="title" height="104%" width="100%"/>
  </div>
</template>

<script>
import moment from 'moment'
import Chart from '@/components/Charts/mixChart'
import { getdynamicDate } from '@/utils/index'
import { getCountActivityUser } from '@/api/dealer'
export default {
  name: 'MixChart',
  components: {
    Chart
  },
  data() {
    return {
      xdata: [],
      ydata: [],
      title: '当天注册数',
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
      getCountActivityUser(this.listQuery).then(response => {
        const _tempYdata = []
        response.rows.map(function(value, key, arr) {
          _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.xdata.map(function(value, key, arr) {
          _tempYdata[key] = _tempYdata[key] === undefined ? 0 : _tempYdata[key]
        })
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

