<template>
  <div class="app-container">
    <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleDialog">新增</el-button>
    <el-input v-model="searchVal" style="width: 200px;" class="filter-item" placeholder="请输入需要查询" @keyup.native.enter="search"/>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">search</el-button>
    <el-dialog :title="authorityName" :visible.sync="dialogFormAuthority" center modal show-close top="1vh" width="70%">
      <el-form ref="dataForm" :model="temp" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="公司编号:">
          <el-checkbox-group v-model="authority1" size="medium" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(item,index) in customerList" :label="item.value" :key="index" border>{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="授权APP:">
          <el-checkbox-group v-model="authority2" size="medium" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="index in appList" :label="index.value" :key="index.val" border>{{ index.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="授权固件:">
          <el-checkbox-group v-model="authority3" size="medium" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="index in productList" :label="index.value" :key="index.val" border>{{ index.label }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" align="right">
        <el-button @click="dialogFormAuthority = false">取消</el-button>
        <el-button type="primary" @click="saveFormAuthority">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="1vh" width="70%">
      <el-form ref="dataForm" :model="temp" :rules="rules">
        <el-form-item :label-width="formLabelWidth" label="账号:" prop="customerAccount">
          <el-input v-model="temp.customerAccount" :disabled="dialogStatus === '编辑账户'"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码:" prop="customerPassword" >
          <el-input v-model="temp.customerPassword" type="password"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="公司中文名称:" prop="customerName">
          <!-- <el-input v-model="temp.customerName"/> -->
          <el-select v-model="temp.customerName" :disabled="dialogStatus === '编辑账户'" filterable placeholder="请选择" @change="setcustomerCode">
            <el-option v-for="item in customerList" :key="item.value" :label="item.name" :value="item.customerCode" />
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="公司编号:">
          <el-input v-model="temp.customerCode" disabled/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系人:" prop="contactUser">
          <el-input v-model="temp.contactUser"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="账户类型:">
          <el-radio-group v-model="temp.customerType">
            <el-radio label="0">经销商</el-radio>
            <el-radio label="1" disabled>开发者</el-radio>
            <el-radio label="2">管理者</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="性别:">
          <el-radio-group v-model="temp.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="公司地址:" prop="customerAddress">
          <el-input v-model="temp.customerAddress"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="联系方式:" prop="customerContact">
          <el-input v-model="temp.customerContact"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="邮箱:" prop="customerEamil">
          <el-input v-model="temp.customerEamil"/>
        </el-form-item>
        <el-form-item v-if="temp.customerType=='2'" :label-width="formLabelWidth" label="超级管理员:">
          <el-checkbox-group v-model="authoList">
            <el-checkbox label="1">账户管理</el-checkbox>
            <el-checkbox label="4">固件管理</el-checkbox>
            <el-checkbox label="3">App管理</el-checkbox>
            <el-checkbox label="21">邮件模板</el-checkbox>
            <el-checkbox label="2">意见反馈</el-checkbox>
            <el-checkbox label="5">用户图表</el-checkbox>
            <el-checkbox label="6">用户列表</el-checkbox>
            <el-checkbox label="7">操作历史</el-checkbox>
            <el-checkbox label="23">表盘管理</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="temp.customerType=='2'" :label-width="formLabelWidth" label="查看数据:">
          <el-checkbox-group v-model="authoList">
            <el-checkbox label="8">查看用户数</el-checkbox>
            <el-checkbox label="9">查看用户设备数量</el-checkbox>
            <el-checkbox label="10">用户群体分析</el-checkbox>
            <el-checkbox label="11">用户列表</el-checkbox>
            <el-checkbox label="12">运动数据分析</el-checkbox>
            <el-checkbox label="22">重置用户密码</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="temp.customerType=='2'" :label-width="formLabelWidth" label="推广服务:">
          <el-checkbox-group v-model="authoList">
            <el-checkbox label="13">邮件推广</el-checkbox>
            <el-checkbox label="14">短信及邮件推广</el-checkbox>
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
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='新增账户'" type="primary" @click="createData">新增</el-button>
          <el-button v-else type="primary" @click="updateData">编辑</el-button>
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
import { setAccountAuthority, getAccountAuthority, getAccountList, addDealer, editDealer, getDealerInfo, getListCustomer, getAPPList, getProductList } from '@/api/dealer'
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
      // contactUser1: this.$store.state.user.contactUser,
      // userAuthority: this.$store.state.user.authority.authority1,
      // userCustomerId: this.$store.getters.customerId,
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
        addType: '1',
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
    const difference = (a, b) => { const s = new Set(b); return a.filter(x => !s.has(x)) }
    console.log(difference([1, 2, 3], [1, 2]))
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
        this.accountList = response.rows
        this.totalQuantity = response.total
      })
      getListCustomer({}).then(response => {
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
      console.log('page1=' + page)
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
      const _this = this
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
    handleUpdate: function(row) {
      this.dialogStatus = '编辑账户'
      getDealerInfo(row.customerAccountId).then(response => {
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
          this.temp.authotity = this.authoList.join(',')
          addDealer(this.temp).then(response => {
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
    handleCheckedCitiesChange: function(val) {
      console.log(val)
    },
    setcustomerCode: function(val) {
      this.temp.customerCode = val
    },
    updateData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.authotity = this.authoList.join(',')
          editDealer(this.temp).then(response => {
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
