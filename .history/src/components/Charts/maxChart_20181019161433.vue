<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

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
      type: String,
      default: '标题'
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
      this.showLoading()
    },
    showLoading() {
      this.chart.showLoading({
        animation: false,
        text: '数据加载中...',
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
        calculable: true,
        xAxis: [{
          type: 'category',
          data: this.xdata
        }],
        yAxis: [{
          type: 'value'
        }],
        visualMap: {
          show: false,
          min: 0,
          max: 50,
          dimension: 0,
          inRange: {
            color: ['#308e92', '#4a657a']
          }
        },
        series: [{
          name: this.title[0],
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: '#35868D',
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
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: '#34BFA3',
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
    }
  }
}
</script>
