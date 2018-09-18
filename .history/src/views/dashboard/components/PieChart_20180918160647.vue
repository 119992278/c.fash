<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import { getCountAge } from '@/api/dealer'
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
      chart: null
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.initChart()
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
        response.rows.map(function(value, key, arr) {
          let before = 0
          if (value.unitFormat === '198') {
            _tempYdata.push({ value: value.number, name: '80后' })
          } else if (value.unitFormat === '199') {
            _tempYdata.push({ value: value.number, name: '90后' })
          } else if (value.unitFormat === '197') {
            _tempYdata.push({ value: value.number, name: '70后' })
          } else if (value.unitFormat === '196') {
            _tempYdata.push({ value: value.number, name: '60后' })
          } else {
            if (parseInt(value.unitFormat) <= 196) {
              before += value.number
            }
            _tempYdata.push({ value: before, name: '60前' })
          }
        })

        const xdata = ['60前', '60后', '70后', '80后', '90后', '00后']
        const ydata = _tempYdata
        // const ydata = [
        //   { value: 320, name: '60前' },
        //   { value: 240, name: '60后' },
        //   { value: 149, name: '70后' },
        //   { value: 100, name: '80后' },
        //   { value: 59, name: '90后' },
        //   { value: 59, name: '00后' }
        // ]
        _this.initChart(xdata, ydata)
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
            name: '用户群体分析',
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
