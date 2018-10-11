<template>
  <div class="app-container">
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible" center modal show-close top="3vh" width="40%">
      <el-form ref="dataForm" :model="listQuery">
        <el-form-item :label-width="formLabelWidth" label="表盘名字:" prop="watchFaceName">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='新增' + tempName" type="primary" @click="createData">新增</el-button>
          <el-button v-else type="primary" @click="updateData">编辑</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTabClick">
      <el-tab-pane label="全部" name="all">
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
          <el-table-column label="联系人" min-width="50" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提问时间" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.insterTime |momentStamp }}
            </template>
          </el-table-column>
          <el-table-column label="问题" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.opiNion }}</span>
            </template>
          </el-table-column>
          <el-table-column label="答复" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.feedBackAnswer | feedBackAnswerStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.feedBackAnswer === null" size="mini" type="success" @click="scope.row.edit=!scope.row.edit">答复</el-button>
              <el-button v-else size="mini" type="success" disabled>已答复</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </el-tab-pane>
      <el-tab-pane label="已回复" name="call">
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
          <el-table-column label="联系人" min-width="50" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提问时间" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.insterTime |momentStamp }}
            </template>
          </el-table-column>
          <el-table-column label="问题" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.opiNion }}</span>
            </template>
          </el-table-column>
          <el-table-column label="答复" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.feedBackAnswer | feedBackAnswerStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.feedBackAnswer === null" size="mini" type="success" @click="scope.row.edit=!scope.row.edit">答复</el-button>
              <el-button v-else size="mini" type="success" disabled>已答复</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </el-tab-pane>
      <el-tab-pane label="未回复" name="nocall">
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
          <el-table-column label="联系人" min-width="50" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span> {{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="提问时间" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.insterTime |momentStamp }}
            </template>
          </el-table-column>
          <el-table-column label="问题" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.opiNion }}</span>
            </template>
          </el-table-column>
          <el-table-column label="答复" min-width="80" align="left" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.feedBackAnswer | feedBackAnswerStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button v-if="scope.row.feedBackAnswer === null" size="mini" type="success" @click="scope.row.edit=!scope.row.edit">答复</el-button>
              <el-button v-else size="mini" type="success" disabled>已答复</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="listQuery.sEcho" :page-sizes="[10,20,30,40,50,100]" :page-size="listQuery.limit" :total="totalQuantity" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
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
      tempName: '反馈',
      activeName: 'all',
      fileList: [],
      formLabelWidth: '130px',
      dialogStatus: '新增' + this.tempName,
      list: null,
      listLoading: true,
      searchVal: '',
      totalQuantity: 0,
      dialogFormVisible: false,
      temp: {
        name: ''
      },
      listQuery: {
        answerStauts: null,
        answerType: 0,
        customerId: cleanCustomerId(getCookie('customerId')),
        insterTime: null,
        opiNion: null,
        params: { startIndex: 0, maxCount: 30 },
        userInfoId: null
      }
    }
  },
  computed: {
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
        this.totalQuantity = response.total
      })
    },
    handleCurrentChange: function(page) {
      if (this.listQuery.sEcho !== page) {
        this.listQuery.params.maxCount = page
        this.listQuery.start = page * 10 - 10
      }
      this.fetchData()
    },
    handleSizeChange: function(page) {
      this.listQuery.params.maxCount = page
      this.listQuery.start = 0
      this.fetchData()
    },
    createData: function() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addfeedBack(this.temp).then(response => {
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
    confirmEdit(row) {
      row.edit = false
    },
    updateData() {}
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
