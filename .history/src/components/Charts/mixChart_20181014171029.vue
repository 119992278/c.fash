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
    load: {
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
      chart: null
    }
  },
  watch: {
    load: function(val) {
      console.log(val)
      this.showLoading()
    },
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
    },
    showLoading() {
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
          name: this.title,
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
