<script setup>
import { onMounted, ref } from 'vue'
import GestureLock from './gesture-lock'

const canvas = ref(null)
onMounted(() => {
  canvas.value.width = 600
  canvas.value.height = 600
  new GestureLock(canvas.value, {
    rows: 5,
    cols: 5
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
