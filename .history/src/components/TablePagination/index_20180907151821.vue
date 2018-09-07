<template>
  <div>
    {{ title }}:{{ totalQuantity }}
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageCount"
      :total="totalQuantity"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>
<script>
export default {
  name: 'VPagination',
  props: {
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
