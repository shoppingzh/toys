<script setup lang="ts">
import { onMounted, ref } from 'vue'
const canvasRef = ref<HTMLCanvasElement>(null)
const DRAW_TEXT: string = 'hello, 郑晓平'
onMounted(() => {
  const { width, height } = canvasRef.value
  const ctx = canvasRef.value.getContext('2d')
  ctx.save()
  ctx.fillStyle = 'rgba(0, 0, 0, .1)'
  ctx.fillRect(0, 0, width, height)
  ctx.restore()

  ctx.font = '20px bold'
  ctx.textBaseline = 'top'
  const metrics = ctx.measureText(DRAW_TEXT)
  const tw = metrics.width
  const th = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
  const x = (width - tw) / 2
  const y = (height - th) / 2

  ctx.save()
  ctx.fillStyle = 'rgba(255, 0, 255, .7)'
  ctx.fillRect(x, y, tw, th)
  ctx.restore()

  ctx.save()
  ctx.fillStyle = '#333'
  ctx.fillText(DRAW_TEXT, x, y + metrics.fontBoundingBoxAscent)
  ctx.restore()
})
</script>

<template>
  <canvas ref="canvasRef" />
</template>

<style></style>
