<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import { getCountSex } from '@/api/dealer'
require('echarts/theme/macarons') // echarts theme
import { getCookie } from '@/utils/auth'
import { sleep, cleanCustomerId } from '@/utils/index'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      xdata: ['男', '女'],
      ydata: [{ 'value': 0, 'name': '男' }, { 'value': 0, 'name': '女' }],
      chart: null
    }
  },
  created() {

  },
  async mounted() {
    this.initChart(this.xdata, this.ydata)
    await sleep(2000)
    this.fetchData()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    fetchData() {
      const _this = this
      getCountSex({ beforeDays: null, customerId: cleanCustomerId(getCookie('customerId')) }).then(response => {
        if (response.rows.length > 0) {
          const _tempYdata = []
          const beforeAge = 0
          const afterAge = 0
          response.rows.map(function(value, key, arr) {
            if (value.unitFormat === '0') {
              _tempYdata.push({ value: value.number, name: $t('chart.man') })
            } else if (value.unitFormat === '1') {
              _tempYdata.push({ value: value.number, name: '女' })
            }
          })
          _this.initChart(this.xdata, _tempYdata)
        }
      })
    },
    initChart(xdata, ydata) {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: xdata
        },
        calculable: true,
        series: [
          {
            name: '用户总数',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: ydata,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
