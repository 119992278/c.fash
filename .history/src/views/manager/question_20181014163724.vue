<template>
  <div class="app-container">
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="3vh" width="40%">
      <el-form ref="dataForm" :model="listQuery">
        <el-form-item :label-width="formLabelWidth" :label="$t('table.question')" prop="">
          <el-input v-model="opiNion" disabled/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" :label="$t('table.reply')" prop="">
          <el-input v-model="answer"/>
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
          <el-button type="primary" @click="updateData">{{ $t('table.save') }}</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick">
      <el-tab-pane :label="$t('table.all')" name="all">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row>
          <el-table-column align="center" label="ID" width="95" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.contacter')" min-width="50" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提问时间" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.insterTime | momentStamp }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.question')" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.opiNion }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.answer')" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.feedBackAnswer | feedBackAnswerStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.operation')" width="100" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import i18n from '@/lang'
import dayjs from 'dayjs'
import { getToken, getCookie } from '@/utils/auth'
import { momentStampFormat, cleanCustomerId } from '@/utils/index'
import { Message, MessageBox } from 'element-ui'
import { getfeedBackList, addfeedBack } from '@/api/dealer'
import { isvalidNoEmpty } from '@/utils/validate'
export default {
  filters: {
    momentStamp(timestamp) {
      return momentStampFormat(timestamp)
    },
    feedBackAnswerStatus(arr) {
      if (arr != null) {
        return arr[0].answer
      } else {
        return ''
      }
    }
  },
  // 引入组件
  components: {
  },
  data() {
    return {
      activeName: 'all',
      fileList: [],
      opiNion: '',
      answer: '',
      formLabelWidth: '130px',
      dialogStatus: i18n.t('table.answer'),
      list: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogFormVisible: false,
      temp: {
        answer: '',
        insterTime: dayjs(),
        opinionId: '',
        paramId: 0,
        userInfoId: 0
      },
      listQuery: {
        answerStauts: null,
        answerType: 1,
        customerId: cleanCustomerId(getCookie('customerId')),
        insterTime: null,
        opiNion: null,
        params: { startIndex: 0, maxCount: 10 },
        userInfoId: null
      }
    }
  },
  computed: {
  },
  watch: {
    dialogFormVisible: function(val) {
      if (val === false) {
        this.$refs['dataForm'].resetFields()
        this.resetTemp()
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getfeedBackList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.feedBack
        this.totalQuantity = response.resMap.count
      })
    },
    resetTemp() {
      this.opiNion = ''
      this.answer = ''
      this.temp = {
        answer: '',
        insterTime: dayjs(),
        opinionId: '',
        paramId: 0,
        userInfoId: 0
      }
    },
    handleCurrentChange: function(page) {
      if (this.listQuery.sEcho !== page) {
        this.listQuery.params.startIndex = page
        this.listQuery.start = page * 10 - 10
      }
      this.fetchData()
    },
    handleSizeChange: function(page) {
      this.listQuery.params.maxCount = page
      this.listQuery.start = 0
      this.fetchData()
    },
    handleTabClick(tab, event) {
      if (tab.name === 'all') {
        this.listQuery.answerStauts = ''
      } else if (tab.name === 'call') {
        this.listQuery.answerStauts = 1
      } else if (tab.name === 'nocall') {
        this.listQuery.answerStauts = 0
      }
      this.fetchData()
    },
    updateData() {
      this.temp.answer = this.answer
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addfeedBack(this.temp).then(response => {
            this.dialogFormVisible = false
            Message({
              title: '成功',
              message: '答复成功',
              type: 'success',
              duration: 2 * 1000
            })
            this.fetchData()
          })
        }
      })
    },
    handleUpdate: function(row) {
      this.dialogFormVisible = true
      this.opiNion = row.opiNion
      alert(row.feedBackAnswer[row.feedBackAnswer.length].answer)
      this.answer = row.feedBackAnswer[row.feedBackAnswer.length].answer
      this.temp.opinionId = row.id
      console.log(this.temp)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.el-dialog{width:80%}
.el-pagination {
  text-align: center;
  margin-top: 2em;
}
.el-table td, .el-table th{
  padding:16px 0
}
</style>
