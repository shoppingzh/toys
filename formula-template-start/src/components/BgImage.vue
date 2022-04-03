<template>
  <div
    class="formula"
    :style="styles"></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  image: { type: String, required: true },
  position: { type: Object, required: true }
})
const styles = computed(() => ( {
  'background-image': `url(${props.image})`,
  'background-position': `-${props.position.x}px -${props.position.y}px`,
  'width': `${props.position.width}px`,
  'height': `${props.position.height}px`
}))
</script>

<style lang="less" scoped>
  .formula {
    background-repeat: no-repeat;
  }
</style>