<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import { getCountSex } from '@/api/dealer'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

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
  mounted() {
    this.initChart(this.xdata, this.ydata)
    setTimeout(() => {
      this.fetchData()
    }, 2000)
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
      getCountAge({ beforeDays: null }).then(response => {
        const _tempYdata = []
        const beforeAge = 0
        const afterAge = 0
        response.rows.map(function(value, key, arr) {
          // if (value.unitFormat === '198') {
          //   _tempYdata.push({ value: value.number, name: '80后' })
          // } else if (value.unitFormat === '199') {
          //   _tempYdata.push({ value: value.number, name: '90后' })
          // } else if (value.unitFormat === '197') {
          //   _tempYdata.push({ value: value.number, name: '70后' })
          // } else if (value.unitFormat === '196') {
          //   _tempYdata.push({ value: value.number, name: '60后' })
          // } else {
          //   if (parseInt(value.unitFormat) <= 196) {
          //     beforeAge += value.number
          //   }
          //   if (parseInt(value.unitFormat) >= 199) {
          //     afterAge += value.number
          //   }
          // }
        })
        _tempYdata.push({ value: beforeAge, name: '60前' })
        _tempYdata.push({ value: afterAge, name: '00后' })
        _this.initChart(this.xdata, _tempYdata)
      })
    },
    initChart(xdata, ydata) {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        // title: {
        //   text: '年龄段分布'
        // },
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
