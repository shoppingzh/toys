<template>
  <div class="fruit-view">
    <month-card v-for="x in 12" :key="x" :no="x" />
  </div>
</template>

<script>

export default {
  name: 'FruitView'
}
</script>

<style lang="less" scoped>
  .fruit-view {
    padding: 20px;
  }
</style>
