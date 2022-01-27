<script setup>
import { getUserMedia } from 'tongpo/lib/media'
import { computed, onUnmounted, ref } from 'vue'
import RecorderButton from './RecorderButton.vue'
import Button from '../Button/index.vue'

const active = ref(false)
let blobParts = null
let stream = null
let mr = null
const url = ref(null)

const hasAudio = computed(() => !!url.value)

const start = async() => {
  try {
    blobParts = []
    stream = await getUserMedia({ audio: true })
    stream.oninactive = e => {
      active.value = false
    }
    mr = new MediaRecorder(stream, {})
    mr.ondataavailable = e => {
      blobParts.push(e.data)
    }
    mr.onstop = () => {
      const blob = new Blob(blobParts, { type: 'audio/mp3' })
      url.value = URL.createObjectURL(blob)
    }
    mr.start()
    active.value = true
  } catch (err) {
    console.error(err)
    active.value = false
  }
}

const stop = () => {
  mr && mr.stop()
  stream && stream.getTracks().forEach(t => t.stop())
  active.value = false
}

const toggle = async() => {
  if (active.value) return stop()
  start()
}

const download = () => {
  const el = document.createElement('a')
  el.download = '录音.mp3'
  el.href = url.value
  el.style.display = 'none'
  el.click()
}

const play = () => {
  const el = document.createElement('audio')
  el.src = url.value
  el.style.display = 'none'
  document.body.appendChild(el)
  el.play()
}

const remove = () => {
  URL.revokeObjectURL(url.value)
  url.value = null
}

onUnmounted(() => {
  stop()
})
</script>

<template>
  <div class="tw-h-full tw-flex tw-flex-col">
    <div class="tw-px-4 tw-py-6 tw-text-center tw-text-xl tw-font-medium">
      <span class="title">H5录音能力展示</span>
    </div>
    <div class="tw-flex-1 tw-h-0 tw-py-12">
      <div class="tw-flex tw-flex-col tw-h-full">
        <div class="tw-text-center">
          <recorder-button :active="active" @click="toggle">hello</recorder-button>
        </div>
        <div class="tw-w-full tw-h-0 tw-flex-1 tw-mt-10 tw-flex tw-items-end tw-justify-around">
          <Button :disabled="!hasAudio" @click="download">
            <i class="iconfont icon-xiazai" />
          </Button>
          <Button :disabled="!hasAudio" @click="play">
            <i class="iconfont icon-bofang" />
          </Button>
          <Button :disabled="!hasAudio" @click="remove">
            <i class="iconfont icon-shanchu" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.title {
  position: relative;
  z-index: 1;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 10px;
    right: 10px;
    bottom: 0;
    height: 8px;
    @apply tw-bg-green-300;
  }
}
.button i {
  font-size: 20px;
}
</style>
