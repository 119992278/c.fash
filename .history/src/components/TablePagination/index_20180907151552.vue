<template>
  <div>
    {{ title }}:{{ totalQuantity }}
    <el-pagination
      background
      :current-page="currentPage"
      @size-change="handleSizeChange"
      :page-sizes="[5, 10, 20, 50, 100]"
      @current-change="handleCurrentChange"
      :page-size="pageCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalQuantity"/>
  </div>
</template>
<script>
export default {
  name: 'VPagination',
  props: {
    totalPage: Number,
    title: String
  },
  data() {
    return {
      totalQuantity: 0,
      pageCount: 10
    }
  },
  watch: {
    totalPage: function(val) {
      this.totalQuantity = val
      console.log('totalQuantity=' + val)
    }
  },
  methods: {
    handleCurrentChange: function(page) {
      this.$emit('handle-CurrentChange', page)
    },
    handleSizeChange: function(page) {
      this.$emit('handle-SizeChange', page)
    }
  }
}
</script>
<style>
.el-table td,
.el-table th {
  padding: 5px 0;
}
</style>
