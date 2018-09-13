<template>
  <div class="chart-container">
    <el-date-picker
      v-model="tdata"
      type="year"
      value-format="yyyy"
      placeholder="选择年"
      @change="changeDatePicker"/>
    <chart id="year" :xdata="xdata" :ydata="ydata" :title="title" height="98%" width="100%"/>
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
      xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      ydata: [],
      title: '当年注册数',
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
      getCountActivityUser(this.listQuery).then(response => {
        const _tempYdata = []
        const index = 1
        response.rows.map(function(value, key, arr) {
          _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.ydata = _tempYdata
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
  text-align: center;
  width: 100%;
  padding:1%;
  height: calc(100vh - 84px);
}
</style>

