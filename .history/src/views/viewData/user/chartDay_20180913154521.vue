<template>
  <div class="chart-container">
    <el-date-picker v-model="value" size="large" type="month" placeholder="选择月"/>
    <!-- <el-date-picker
      v-model="value"
      :default-time="['00:00:00', '23:59:59']"
      class="picker-class"
      type="daterange"
      format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd HH:hh:mm"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="changeDatePicker"/> -->
    <chart id="day" :xdata="xdata" :ydata="ydata" :title="title" height="98%" width="100%"/>
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
      value: new date(),
      xdata: [],
      ydata: [],
      title: '当天注册数',
      listQuery: {
        customerId: null,
        endTime: moment().add('month', 0).endOf('month').format('YYYY-MM-DD HH:mm:ss'),
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
      getCountRegUser(this.listQuery).then(response => {
        const _tempYdata = []
        response.rows.map(function(value, key, arr) {
          _tempYdata[parseInt(value.unitFormat) - 1] = parseInt(value.number)
        })
        this.xdata.map(function(value, key, arr) {
          _tempYdata[key] = _tempYdata[key] === undefined ? 0 : _tempYdata[key]
        })
        this.ydata = _tempYdata
      })
    },
    changeDatePicker() {
      this.listQuery.startTime = this.value[0]
      this.listQuery.endTime = this.value[1]
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
.picker-class{
    /* width: 500px; */
}
</style>

