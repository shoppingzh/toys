<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import RecorderButton from './RecorderButton.vue'
import Button from '../Button/index.vue'
import useUserMedia from '@/hooks/useUserMedia'
import { download } from '@/utils/file'
import { playAudio } from '@/utils/media'

const { stream, start: startCapture, stop: stopCapture } = useUserMedia({ audio: true })

const active = ref(false)
let blobParts = null
let mr = null
const url = ref(null)
const hasAudio = computed(() => !!url.value)

const startRecord = () => {
  try {
    blobParts = []
    mr = new MediaRecorder(stream.value, {})
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

watch(stream, newVal => {
  if (newVal) {
    startRecord()
  } else {
    active.value = false
  }
})

const stop = () => {
  mr && mr.stop()
  stopCapture()
  active.value = false
}

const toggle = async() => {
  if (active.value) return stop()
  startCapture()
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
          <Button :disabled="!hasAudio" @click="download(url, '新录音.mp3')">
            <i class="iconfont icon-xiazai" />
          </Button>
          <Button :disabled="!hasAudio" @click="playAudio(url)">
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
