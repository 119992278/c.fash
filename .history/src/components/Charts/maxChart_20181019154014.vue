<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
const xData = (function() {
  const data = []
  for (let i = 1; i < 13; i++) {
    data.push(i + 'month')
  }
  return data
}())
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    ydata: {
      type: Array,
      default: function() {
        return []
      }
    },
    chartLoad: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    title: {
      type: Array,
      default: function() {
        return []
      }
    },
    xdata: {
      type: Array,
      default: function() {
        return []
      }
    }},
  data() {
    return {
      throwXdata: [],
      chart: null
    }
  },
  watch: {
    chartLoad: function(val) {
      if (val) {
        this.showLoading()
      } else {
        this.chart.hideLoading()
      }
    },
    ydata: function(val) {
      this.setOption()
    },
    xdata: function(val) {
      if (this.throwXdata.length === 0) {
        this.setOption()
        this.throwXdata = val
      }
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.showLoading({
        animation: true,
        text: '数据加载中..',
        color: '#1582F0',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        textStyle: { fontSize: 50 }
      })
    },
    setOption() {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 0,
          bottom: 0,
          textStyle: {
            color: '#fff'
          }
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          data: this.xdata
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        series: [{
          name: this.title[0],
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.ydata[0]
        },

        {
          name: this.title[1],
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.ydata[1]
        }
        ]
      })
      this.chart.hideLoading()
    }
  }
}
</script>
