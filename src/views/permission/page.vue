<template>
  <div class="app-container">
    这是权限界面
  </div>
</template>

<script>

export default{
  name: 'PagePermission',
  components: { },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  }
}
</script>
