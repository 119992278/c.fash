<template>
  <el-row :gutter="40" class="panel-group">
    <el-col class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('chart.userTotalCount') }}</div>
          <count-to :start-val="0" :end-val="totalUser" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="people" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('chart.todaySignUpped') }}</div>
          <count-to :start-val="0" :end-val="todayUser" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="component" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('chart.activationDeviceCount') }}</div>
          <count-to :start-val="0" :end-val="totalDevice" :duration="4200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="example" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ $t('chart.todayActived') }}</div>
          <count-to :start-val="0" :end-val="todayDevice" :duration="3600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getCookie } from '@/utils/auth'
import { getRegUserCount, getDeviceCount, getBindUserCount } from '@/api/dealer'
import { cleanCustomerId } from '@/utils/index'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      todayUser: 0,
      todayDevice: 0,
      totalUser: 0,
      totalDevice: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.getUserCount()
      this.getDeviceCount()
    },
    getUserCount() {
      getRegUserCount({ beforeDays: null, customerId: cleanCustomerId(getCookie('customerId')) }).then(response => {
        this.totalUser = response.data
      })
      getRegUserCount({ beforeDays: 0, customerId: cleanCustomerId(getCookie('customerId')) }).then(response => {
        this.todayUser = response.data
      })
    },
    getDeviceCount() {
      getDeviceCount({ customerId: cleanCustomerId(getCookie('customerId')) }).then(response => {
        this.totalDevice = response.data
      })
      getBindUserCount({ beforeDays: 0, customerId: cleanCustomerId(getCookie('customerId')) }).then(response => {
        this.todayDevice = response.data
      })
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    width: 25%;
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    //cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      text-align: right;
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
