<template></template>

<script>
export default {
  layout: 'LayoutDashboard',
  middleware: 'auth',
  fetch() {
    this.$router.push({ name: 'overview' })
  },
}
</script>
