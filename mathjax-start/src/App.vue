<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { debounce } from 'lodash'
import Moveable from 'moveable'

const content = ref(String.raw`\sqrt{2\sum{x\sqrt{2222222\div332423}}}`)
const svgUrl = ref(null)
const imgEl = ref(null)
const moveable = ref(null)
const moving = ref(false)

const render = () => {
  const oldUrl = svgUrl.value
  const el = MathJax.tex2svg(content.value)
  const svgEl = el.querySelector('svg')
  const blob = new Blob([svgEl.outerHTML], { type: 'image/svg+xml' })
  svgUrl.value = URL.createObjectURL(blob)

  // 销毁资源
  URL.revokeObjectURL(oldUrl)
}

const destroyMoveable = () => {
  moveable.value && moveable.value.destroy()
}

watch(content, debounce((newVal, oldVal) => {
  if (!newVal) return
  render()
}, 1500), { immediate: true })

watch(svgUrl, (newVal, oldVal) => {
  if (!newVal) return
  setTimeout(() => {
    destroyMoveable()
    moveable.value = new Moveable(document.body, {
      target: imgEl.value,
      resizable: true,
      renderDirections: ['se'],
      zoom: 0.5
    })
    moveable.value.on('resize', e => {
      const { clientWidth, clientHeight } = imgEl.value
      const { delta } = e
      imgEl.value.style.width = (clientWidth + delta[0]) + 'px'
      imgEl.value.style.height = (clientHeight + delta[1]) + 'px'

      moving.value = true
    })
    moveable.value.on('resizeEnd', () => {
      moving.value = false
    })
  }, 300)
})

onUnmounted(() => {
  destroyMoveable()
})

</script>

<template>
  <textarea
    class="editor"
    v-model="content"
    placeholder="输入公式试试吧！">
    
  </textarea>
  <div
    class="viewer">
    <img
      ref="imgEl"
      v-if="svgUrl"
      :src="svgUrl">
  </div>
  <div class="tips">
    <template v-if="moving">是的！它并不会失真！！！</template>
    <template v-else>试着放大/缩小生成的公式图片吧！</template>
  </div>
</template>

<style lang="less" scoped>
.editor {
  width: 100%;
  height: 500px;
  border: 1px solid rgba(0, 0, 0, .8);
}
.viewer {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(100, 100, 100, .1);
  img {
    min-width: 100px;
  }
}
.tips {
  margin-top: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, .6);
}
</style>
