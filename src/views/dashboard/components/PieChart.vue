<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import i18n from '@/lang'
import echarts from 'echarts'
import { getCountAge } from '@/api/dealer'
require('echarts/theme/macarons') // echarts theme
import { sleep } from '@/utils'
import { getCookie } from '@/utils/auth'
import { cleanCustomerId } from '@/utils/index'

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
      xdata: [i18n.t('chart.former60'), i18n.t('chart.background60'), i18n.t('chart.background70'), i18n.t('chart.background80'), i18n.t('chart.background90'), i18n.t('chart.background00')],
      ydata: [{ 'value': 0, 'name': i18n.t('chart.background60') }, { 'value': 0, 'name': i18n.t('chart.background70') }, { 'value': 0, 'name': i18n.t('chart.background80') }, { 'value': 0, 'name': i18n.t('chart.background90') }, { 'value': 0, 'name': i18n.t('chart.former60') }, { 'value': 0, 'name': i18n.t('chart.background00') }],
      chart: null
    }
  },
  created() {

  },
  async mounted() {
    this.initChart(this.xdata, this.ydata)
    await sleep(3000)
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
      getCountAge({ beforeDays: null, customerId: cleanCustomerId(getCookie('customerId')) }).then(response => {
        if (response.rows.length > 0) {
          const _tempYdata = []
          let beforeAge = 0
          let afterAge = 0
          response.rows.map(function(value, key, arr) {
            if (value.unitFormat === '198') {
              _tempYdata.push({ value: value.number, name: i18n.t('chart.background80') })
            } else if (value.unitFormat === '199') {
              _tempYdata.push({ value: value.number, name: i18n.t('chart.background90') })
            } else if (value.unitFormat === '197') {
              _tempYdata.push({ value: value.number, name: i18n.t('chart.background70') })
            } else if (value.unitFormat === '196') {
              _tempYdata.push({ value: value.number, name: i18n.t('chart.background60') })
            } else {
              if (parseInt(value.unitFormat) <= 196) {
                beforeAge += value.number
              }
              if (parseInt(value.unitFormat) >= 199) {
                afterAge += value.number
              }
            }
          })
          _tempYdata.push({ value: beforeAge, name: i18n.t('chart.former60') })
          _tempYdata.push({ value: afterAge, name: i18n.t('chart.background00') })
          _this.initChart(this.xdata, _tempYdata)
        }
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
