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
      chart: null
    }
  },
  watch: {
    ydata: function(val) {
      this.setOption()
    },
    xdata: function(val) {
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
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.showLoading({
        animation: false,
        text: '数据加载中..',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        textStyle: { fontSize: 20 }
      })
    },
    setOption() {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: this.xdata
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          type: 'bar',
          data: this.ydata,
          color: '#00BFB7'
        }]
      })
      this.chart.hideLoading()
    }
  }
}
</script>
