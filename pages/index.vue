<template></template>

<script>
export default {
  middleware: 'auth',
  layout: 'LayoutDashboard',
  fetch() {
    this.$router.push({ name: 'overview' })
  },
}
</script>
