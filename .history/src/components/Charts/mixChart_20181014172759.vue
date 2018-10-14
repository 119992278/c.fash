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
        this.chart.showLoading({
          animation: false,
          text: '数据加载中..',
          color: '#1582F0',
          maskColor: 'rgba(255, 255, 255, 0.8)',
          textStyle: { fontSize: 50 }
        })
      } else {
        this.chart.hideLoading()
      }
    },
    ydata: function(val) {
      this.setOption()
    },
    xdata: function(val) {
      console.log(1111)
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
    }
  }
}
</script>
