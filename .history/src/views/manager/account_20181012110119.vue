<template>
  <div class="app-container">
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleDialog">{{ $t('table.newAdd') }}</el-button>
    <el-input v-model="searchVal" :placeholder="$t('table.inputQuery')" style="width: 200px;" class="filter-item" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
    <el-dialog :title="authorityName" :visible.sync="dialogFormAuthority" center modal show-close top="1vh" width="70%">
      <el-form ref="dataForm" :model="temp" :rules="rules">
        <el-form-item :label-width="formLabelWidth" :label="$t('table.companyNo')">
          <el-checkbox-group v-model="authority1" size="medium" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item,index) in customerList" :label="item.value" :key="index" border>{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.authority2')">
          <el-checkbox-group v-model="authority2" size="medium" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="index in appList" :label="index.value" :key="index.val" border>{{ index.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.authority3')">
          <el-checkbox-group v-model="authority3" size="medium" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="index in productList" :label="index.value" :key="index.val" border>{{ index.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" align="right">
        <el-button @click="dialogFormAuthority = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="saveFormAuthority">{{ $t('table.save') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="1vh" width="70%">
      <el-form ref="dataForm" :model="temp" :rules="rules">
        <el-form-item :label-width="formLabelWidth" :label="$t('table.account')" prop="customerAccount">
          <el-input v-model="temp.customerAccount" :disabled="dialogStatus === '编辑账户'"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.pwd')" prop="customerPassword" >
          <el-input v-model="temp.customerPassword" type="password"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.companyChineseName')" prop="customerName">
          <!-- <el-input v-model="temp.customerName"/> -->
          <el-select v-model="temp.customerName" :disabled="dialogStatus === '编辑账户'" filterable placeholder="请选择" @change="setcustomerCode">
            <el-option v-for="item in customerList" :key="item.value" :label="item.name" :value="item.customerCode" />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.companyNo')">
          <el-input v-model="temp.customerCode" disabled/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.contacter')" prop="contactUser">
          <el-input v-model="temp.contactUser"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.accountType')">
          <el-radio-group v-model="temp.customerType">
            <el-radio label="0">{{ $t('table.agency') }}</el-radio>
            <el-radio label="1" disabled>{{ $t('table.developer') }}</el-radio>
            <el-radio label="2">{{ $t('table.manager') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.contacter')">
          <el-radio-group v-model="temp.sex">
            <el-radio label="0">{{ $t('chart.man') }}</el-radio>
            <el-radio label="1">{{ $t('chart.woman') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.companyAddress')" prop="customerAddress">
          <el-input v-model="temp.customerAddress"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.tel')" prop="customerContact">
          <el-input v-model="temp.customerContact"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.mailbox')" prop="customerEamil">
          <el-input v-model="temp.customerEamil"/>
        </el-form-item>
        <el-form-item v-if="temp.customerType=='2'" :label-width="formLabelWidth" :label="$t('table.superManager')">
          <el-checkbox-group v-model="authoList">
            <el-checkbox label="1">{{ $t('route.superManager') }}</el-checkbox>
            <el-checkbox label="4">{{ $t('route.haredwareManager') }}</el-checkbox>
            <el-checkbox label="3">{{ $t('route.appManager') }}</el-checkbox>
            <el-checkbox label="21">{{ $t('route.mailTemplate') }}</el-checkbox>
            <el-checkbox label="2">{{ $t('route.opinionFeedback') }}</el-checkbox>
            <el-checkbox label="5">{{ $t('route.userChart') }}</el-checkbox>
            <el-checkbox label="6">{{ $t('route.userLineChart') }}</el-checkbox>
            <el-checkbox label="7">{{ $t('route.operationHistory') }}</el-checkbox>
            <el-checkbox label="23">{{ $t('route.dialManager') }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="temp.customerType=='2'" :label-width="formLabelWidth" :label="$t('router.data')">
          <el-checkbox-group v-model="authoList">
            <el-checkbox label="8">{{ $t('route.queryUserCount') }}</el-checkbox>
            <el-checkbox label="9">{{ $t('route.queryActivationDeviceCount') }}</el-checkbox>
            <el-checkbox label="10">{{ $t('route.userAnalysis') }}</el-checkbox>
            <el-checkbox label="11">{{ $t('route.userLineChart') }}</el-checkbox>
            <el-checkbox label="12">{{ $t('route.sportDataAnalysis') }}</el-checkbox>
            <el-checkbox label="22">{{ $t('route.resetPwd') }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="temp.customerType=='2'" :label-width="formLabelWidth" :label="$t('router.extensionService')">
          <el-checkbox-group v-model="authoList">
            <el-checkbox label="13">{{ $t('route.EmailPromotion') }}</el-checkbox>
            <el-checkbox label="14">{{ $t('route.shortMessagePromotion') }}</el-checkbox>
            <el-checkbox label="15">APP消息推送</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="temp.customerType=='2'" :label-width="formLabelWidth" label="设置:">
          <el-checkbox-group v-model="authoList">
            <el-checkbox label="16">APP设置</el-checkbox>
            <el-checkbox label="17">固件设置</el-checkbox>
            <el-checkbox label="18">常见问题设置</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
          <el-button v-if="dialogStatus=='新增账户'" type="primary" @click="createData">{{ $t('table.newAdd') }}</el-button>
          <el-button v-else type="primary" @click="updateData">{{ $t('table.edit') }}</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="accountList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="账号" min-width="130" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.customerAccount }}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="110" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.customerType | customerTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司名称1" min-width="130" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.customerName }}
        </template>
      </el-table-column>
      <el-table-column label="公司编号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerCode }}
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.contactUser }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.insertTime }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.auditStatus | auditStatusFilter }}
        </template>
      </el-table-column>
      <el-table-column label="App" min-width="180" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.appName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180" align="center">
        <template slot-scope="scope">
          <el-button :disabled="!$store.state.user.authority.authority1.includes(String(scope.row.customerId))" icon="el-icon-edit" size="small" type="success" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="getCookie('customerId') === 0" size="small" type="primary" @click="handleAuthority(scope.row)">授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { mapStates, mapGetters } from 'vuex'
import { getToken, getCookie } from '@/utils/auth'
import _ from 'lodash'
import { setAccountAuthority, getAccountAuthority, getAccountList, addAccount, editAccount, getAccountInfo, getListCustomer, getAPPList, getProductList } from '@/api/dealer'
import { isvalidNoEmpty, isvalidEmail } from '@/utils/validate'
export default {
  filters: {
    auditStatusFilter(status) {
      const statusMap = { 0: '审核通过' }
      return statusMap[status]
    },
    customerTypeFilter(status) {
      const statusMap = { 0: '经销商', 1: '开发者', 2: '管理者' }
      return statusMap[status]
    }
  },
  // 引入组件
  components: {
  },
  data() {
    return {
      formLabelWidth: '130px',
      accountList: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogFormAuthority: false,
      dialogFormVisible: false,
      dialogStatus: '新增账户',
      authorityName: '',
      authority1: [],
      authority2: [],
      authority3: [],
      customerList: [],
      appList: [],
      productList: [],
      tempCustomerAccountId: '',
      authoList: [],
      temp: {
        addType: '0',
        auditStatus: 0,
        isActivity: 1,
        customerEamil: '', // 119992278@qq.com
        contactUser: '', // 联系人
        customerName: '', // 公司中文名称
        customerContact: '', // 联系方式
        customerCode: '', // 公司编码
        customerAddress: '', // 公司地址
        customerPassword: '', // 888888
        customerAccount: '', // 13888888888
        customerType: '2',
        sex: '0'
      },
      listQuery: {
        customerAccount: '',
        limit: 10,
        sEcho: 1,
        sortCol: 'customerAccountId',
        sortDir: 'asc',
        start: 0
      },
      rules: {
        customerAccount: isvalidNoEmpty,
        customerEamil: isvalidEmail,
        customerContact: isvalidNoEmpty,
        customerAddress: isvalidNoEmpty,
        customerPassword: isvalidNoEmpty,
        customerName: isvalidNoEmpty,
        customerType: isvalidNoEmpty,
        contactUser: isvalidNoEmpty,
        customerCode: isvalidNoEmpty
      }
    }
  },
  computed: {
    ...mapGetters([

    ])
  },
  watch: {
    dialogFormVisible: function(val) {
      if (val === false) {
        this.$refs['dataForm'].resetFields()
        this.resetTemp()
        this.productList = []
        this.appList = []
      }
    },
    dialogFormAuthority: function(val) {
      if (val === false) {
        this.productList = []
        this.appList = []
      }
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    fetchData() {
      const _this = this
      this.listLoading = true
      getAccountList(this.listQuery).then(response => {
        this.listLoading = false
        this.accountList = _.sortBy(response.rows, ['customerAccount'])
        this.totalQuantity = response.total
      })
      getListCustomer({}).then(response => {
        _this.customerList = []
        response.rows.map(function(value1, index, arr) {
          _this.customerList.push({ value: String(value1.customerId), customerCode: value1.customerCode, name: value1.customerName })
        })
      })
    },
    getCookie(customerId) {
      return parseInt(getCookie(customerId))
    },
    search(name) {
      this.listQuery.customerAccount = this.searchVal
      this.fetchData()
    },
    handleCurrentChange: function(page) {
      if (this.listQuery.sEcho !== page) {
        this.listQuery.sEcho = page
        this.listQuery.start = page * 10 - 10
      }
      this.fetchData()
    },
    handleSizeChange: function(page) {
      this.listQuery.limit = page
      this.listQuery.start = 0
      this.fetchData()
    },
    handleDialog: function(params) {
      this.dialogStatus = '新增账户'
      this.temp.customerType = '2'
      this.temp.sex = '0'
      this.temp.authoList = []
      this.dialogFormVisible = true
      this.temp.customerName = 'admin'
      this.temp.customerCode = 'admin'
    },
    handleAuthority: function(row) {
      const _this = this
      this.dialogFormAuthority = true
      this.authorityName = row.contactUser
      this.tempCustomerAccountId = String(row.customerAccountId)
      getAPPList({ limit: 1000, start: 0 }).then(response => {
        response.rows.map(function(value1, index, arr) {
          _this.appList.push({ value: String(value1.appId), label: value1.appChineseName })
        })
      })
      getProductList({ limit: 1000, start: 0 }).then(response => {
        response.rows.map(function(value1, index, arr) {
          _this.productList.push({ value: String(value1.productId), label: value1.productCode })
        })
      })
      getAccountAuthority(row.customerAccountId).then(response => {
        if (response.data) {
          _this.authority1 = response.data.authority1.split(',')
          _this.authority2 = response.data.authority2.split(',')
          _this.authority3 = response.data.authority3.split(',')
        }
      })
    },
    resetTemp() {
      this.authoList = []
      this.temp = {
        addType: '0',
        auditStatus: 0,
        isActivity: 1,
        customerEamil: '',
        contactUser: '',
        customerName: '',
        customerContact: '',
        customerCode: '',
        customerAddress: '',
        customerPassword: '',
        customerAccount: '',
        customerType: '2',
        sex: '0'
      }
    },
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.temp.customerType === '0') { // 经销商
            this.temp.authotity = '8,9,10,11,12,13,14,15,16,17,18'
          } else { // 管理者
            this.temp.addType = '1'
            this.temp.authotity = this.authoList.join(',')
          }
          delete this.temp.authoList
          addAccount(this.temp).then(response => {
            this.dialogFormVisible = false
            Message({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2 * 1000
            })
          })
        }
      })
    },
    handleUpdate: function(row) {
      this.dialogStatus = '编辑账户'
      getAccountInfo(row.customerAccountId).then(response => {
        this.dialogFormVisible = true
        this.temp = Object.assign({}, row)
        this.temp.addType = '0'
        this.temp.isActivity = 1
        this.temp.customerEamil = response.data.email
        this.temp.customerAddress = response.data.address
        this.temp.customerType = String(response.data.customerType)
        this.temp.customerAccountId = String(response.data.customerAccountId)
        this.temp.sex = String(response.data.sex)
        this.authoList = response.data.authotity.split(',')
        delete this.temp.appName
        console.log(JSON.stringify(this.temp))
      })
    },
    updateData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.authotity = this.authoList.join(',')
          editAccount(this.temp).then(response => {
            this.dialogFormVisible = false
            Message({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2 * 1000
            })
            this.resetTemp()
            this.fetchData()
          })
        }
      })
    },
    handleCheckedCitiesChange: function(val) {
      console.log(val)
    },
    setcustomerCode: function(val) {
      this.temp.customerCode = val
    },
    saveFormAuthority: function() {
      const temp = {
        authority1: this.authority1.join(','),
        authority2: this.authority2.join(','),
        authority3: this.authority3.join(','),
        customerAccountId: this.tempCustomerAccountId
      }
      setAccountAuthority(temp).then(response => {
        this.dialogFormAuthority = false
        Message({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2 * 1000
        })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-pagination {
  text-align: center;
  margin-top: 2em;
}
.el-checkbox__label{line-height: 40px}
.el-checkbox+.el-checkbox{margin-left: 20px}
.el-form-item{margin-bottom: 18px}
.el-table td, .el-table th{
  padding:16px 0
}
</style>
