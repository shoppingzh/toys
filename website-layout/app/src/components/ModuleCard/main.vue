<template>
  <el-card class="module-card">
    <div class="module-card__placeholder" :style="{ color }">{{ name || '模块' }}</div>
  </el-card>
</template>

<script>
export default {
  name: 'ModuleCard',
  props: {
    name: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .module-card {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 10px;
    cursor: pointer;
    transition: none; // 这个千万不能开
    &__placeholder {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #aaa;
      font-size: 20px;
      opacity: .8;
    }
    &.is-dragging {
      z-index: 10;
      background-color: rgba(0, 0, 0, .05);
      cursor: move;
    }
  }
</style>
