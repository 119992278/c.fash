<template>
  <div class="chart-container">
    <el-date-picker
      v-model="tdata"
      type="year"
      value-format="yyyy"
      placeholder="选择年"
      @change="changeDatePicker"/>
    <chart id="year" :xdata="xdata" :ydata="ydata" :chart-load="chartLoad" :title="title" height="98%" width="100%"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Chart from '@/components/Charts/mixChart'
import { getToken, getCookie } from '@/utils/auth'
import { getdynamicDate, cleanCustomerId } from '@/utils/index'
import { getCountBindUser } from '@/api/dealer'
export default {
  name: 'MixChart',
  components: {
    Chart
  },
  data() {
    return {
      tdata: new Date(),
      chartLoad: false,
      xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      ydata: [],
      title: '当月激活数',
      listQuery: {
        customerId: cleanCustomerId(getCookie('customerId')),
        endTime: dayjs().add(0, 'year').endOf('year').format('YYYY-MM-DD HH:mm:ss'), // 做到这里了!
        queryType: 2,
        startTime: dayjs().add(0, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.chartLoad = true
    this.fetchData()
  },
  methods: {
    fetchData() {
      const _this = this
      getCountBindUser(this.listQuery).then(response => {
        const _tempYdata = []
        response.rows.map(function(value, key) {
          _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.ydata = _tempYdata
        this.chartLoad = false
      })
    },
    changeDatePicker(select) {
      if (select) {
        this.chartLoad = true
        this.listQuery.startTime = dayjs(this.tdata).startOf('year').format('YYYY-MM-DD HH:mm:ss')
        this.listQuery.endTime = dayjs(this.tdata).endOf('year').format('YYYY-MM-DD HH:mm:ss')
        this.fetchData()
      }
    }
  }
}
</script>

<style scoped>
</style>

