<template>
  <div class="chart-container">
    <div class="container">
      <el-row>
        <el-col :span="6">
          <el-input v-model="customerCode" placeholder="请输入需要查询账户"/>
        </el-col>
        <el-col :span="18">
          <el-date-picker
            v-model="time"
            type="daterange"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changplace"/>
        </el-col>
      </el-row>
    </div>
    <chart id="year" :xdata="xdata" :ydata="ydata" :title="title" height="98%" width="100%"/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import echarts from 'echarts'
import { getSportList } from '@/api/dealer'
export default {
  name: 'MixChart',
  components: {
    Chart
  },
  data() {
    return {
      tdata: new Date(),
      customerCode: 'yingmu94@qq.com',
      xdata: [],
      ydata: [],
      title: '当月激活数',
      time: '',
      listQuery: {
        accountId: 'yingmu94@qq.com',
        customerCode: 'appscomm',
        deviceId: '',
        endTime: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        queryType: '1',
        startTime: dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      }
    }
  },
  created() {
    this.fetchData()
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
        calculable: true,
        xAxis: [{
          type: 'category',
          data: this.xdata
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: this.title,
          type: 'bar',
          data: this.ydata,
          color: '#00BFB7',
          markPoint: {
            data: [{
              type: 'max',
              name: '最大值'
            },
            {
              type: 'min',
              name: '最小值'
            }
            ]
          },
          markLine: {
            data: [{
              type: 'average',
              name: '平均值'
            }]
          }
        }]
      })
      this.chart.hideLoading()
    },
    changplace(val) {
      this.listQuery.startTime = dayjs(val[0]).startOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.listQuery.endTime = dayjs(val[1]).endOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.fetchData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.chart-container{
  text-align: center;
  .container{
    width:80%;margin:0 auto;
    .el-range-editor.el-input__inner{width:90%}
  }
}
</style>

