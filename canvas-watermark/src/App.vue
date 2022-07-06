<template>
  <canvas ref="canvas" width="1000" height="500" />
  我是网页内容
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>(null)

function measure(ctx: CanvasRenderingContext2D, text: string) {
  const { width } = ctx.measureText(text)

  return {
    width
  }
}


onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  canvas.value.width = canvas.value.clientWidth
  canvas.value.height = canvas.value.clientHeight
  const { width, height } = canvas.value
  const text = 'Shoppingzh'
  const xGap = 100, yGap = 150
  const textHeight = 20
  const rotate = 45
  ctx.font = `${textHeight}px bold 微软雅黑`
  ctx.fillStyle = 'rgba(100, 100, 100, .2)'

  const cw = width * Math.cos(rotate * Math.PI / 180) + height * Math.cos((90 - rotate) * Math.PI / 180)
  const ch = height * Math.cos(rotate * Math.PI / 180) + width * Math.cos((90 - rotate) * Math.PI / 180)
  const { width: textWidth } = measure(ctx, text)
  const cols = cw / (textWidth + xGap)
  const rows = ch / (textHeight + yGap)
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.translate(width / 2, height / 2)
  ctx.rotate(-rotate * Math.PI / 180)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = j * (textWidth + xGap) - cw / 2
      const y =  i * (textHeight + yGap) - ch / 2
      ctx.fillText(text, x, y)
    }
  }
})

</script>

<style>
canvas {
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(100, 100, 100, .1);
  pointer-events: none;
}
</style>
