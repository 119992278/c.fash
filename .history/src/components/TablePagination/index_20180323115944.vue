<template>
<div>
  {{title}}:{{totalQuantity}}
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalQuantity"> 
    </el-pagination>
</div>
</template>
<script>
export default {
  name: "v-pagination",
  data() {
    return {
      totalQuantity: 0,
      pageCount: 10
    };
  },
  props: {
    totalPage: Number,
    title: String
  },
  watch: {
    totalPage: function(val) {
      this.totalQuantity = val;
      console.log("totalQuantity=" + val);
    }
  },
  methods: {
    handleCurrentChange: function(page) {
      this.$emit("handle-CurrentChange", page);
    },
    handleSizeChange: function(page) {
      this.$emit("handle-SizeChange", page);
    }
  }
};
</script>
<style>
.el-table td,
.el-table th {
  padding: 5px 0;
}
</style>
