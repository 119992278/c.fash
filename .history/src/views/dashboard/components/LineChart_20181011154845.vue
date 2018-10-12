<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import i18n from '@/lang'
import echarts from 'echarts'
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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    xdata: {
      type: Array,
      default: function() {
        return []
      }
    },
    chartData1: {
      type: Array,
      default: function() {
        return []
      }
    },
    chartData2: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData1: {
      handler() {
        this.chart.hideLoading()
        this.setOptions()
      }
    },
    chartData2: {
      handler() {
        this.chart.hideLoading()
        this.setOptions()
      }
    },
    xdata: function() {
      this.setOption()
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }
  },
  methods: {
    setOptions() {
      this.chart.setOption({
        xAxis: {
          data: this.xdata,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          // show: false,
          data: [i18n.t('chart.UserActived'), '激活设备数']
        },
        series: [
          {
            name: i18n.t('chart.1'),
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: this.chartData1,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }, {
            name: '激活设备数',
            itemStyle: {
              normal: {
                color: '#34BFA3',
                lineStyle: {
                  color: '#34BFA3',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: this.chartData2,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }
        ]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.showLoading({ animation: true, text: '数据加载中..', color: '#1582F0', maskColor: 'rgba(255, 255, 255, 0.8)', textStyle: { fontSize: 50 }})
      this.setOptions()
    }
  }
}
</script>
