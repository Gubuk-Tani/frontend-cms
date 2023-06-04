<template></template>

<script>
export default {
  middleware: 'admin',
  layout: 'LayoutDashboard',
  fetch() {
    this.$router.push({ name: 'overview' })
  },
}
</script>
