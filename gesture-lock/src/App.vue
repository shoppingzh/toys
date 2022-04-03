<script setup>
import { onMounted, ref } from 'vue'
import GestureLock from './gesture-lock'

const canvas = ref(null)
onMounted(() => {
  canvas.value.width = 400
  canvas.value.height = 500
  new GestureLock(canvas.value, {
    rows: 3,
    cols: 3
  })
})
</script>

<template>
  <canvas ref="canvas" />
</template>

<style>
canvas {
  margin-top: 120px;
  margin-left: 30px;
  border: 1px solid #ccc;
}
</style>
