<template>
<div class="tw-p-3 tw-w-full tw-h-full tw-bg-white" :style="{ 'background-color': bgColor }">
  <div class="capture-wrap">
    <div class="tw-mb-5 tw-text-center tw-text-lg tw-font-bold">
      {{ tips }}
    </div>
    <div class="video-wrap tw-relative tw-bg-black tw-rounded-full tw-overflow-hidden">
      <video ref="video" muted autoplay playsinline webkit-playsinline @play="stageWink" />
      <div 
        v-if="showReadyTips"
        class="tw-absolute tw-left-0 tw-top-0 tw-z-10 tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-text-sm tw-text-gray-50"
        @click="stageWink">
        点击此处开始吧
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import useUserMedia from '@/hooks/useUserMedia'
import { download } from '@/utils/file';
import { ref, watch } from 'vue'

const { stream: captureStream, active: captureActive, start: startCapture, stop: stopCapture } = useUserMedia({ video: true, audio: false })
const video = ref(null)
const stage = ref(0)
const showReadyTips = ref(false)
const tips = ref(null)
const bgColor = ref(null)
let mr = null

watch([video, captureStream], ([o1, o2]) => {
  if (!o1 || !o2) return
  video.value.srcObject = captureStream.value
})

// 开始录制
const stageCapture = async() => {
  stage.value = 1
  try {
    await startCapture()
    const chunks = []
    mr = new MediaRecorder(captureStream.value)
    mr.ondataavailable = e => {
      chunks.push(e.data)
    }
    mr.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/mp4' })
      const url = URL.createObjectURL(blob)
      download(url, '人脸录制结果.mp4')
    }
    mr.start()
  } catch (err) {
    console.error(err)
  }
}

// 眨眨眼
const stageWink = () => {
  showReadyTips.value = false
  stage.value = 2
  tips.value = '眨眨眼'
  setTimeout(() => {
    stageFlash()
  }, 2000)
}

// 屏幕闪烁
const stageFlash = () => {
  stage.value = 3
  tips.value = '屏幕即将闪烁'
  const colors = ['#f5222d', '#1890ff', '#eb2f96', '#52c41a', '#faad14', '#13c2c2']
  const flash = () => {
    bgColor.value = colors.shift()
    if (bgColor.value) {
      setTimeout(() => {
        flash()
      }, 350)
    } else {
      stageEnd()
    }
  }
  flash()
}

// 结束
const stageEnd = () => {
  stage.value = 4
  tips.value = '录制结束'
  mr && mr.stop()
}

stageCapture()

watch(captureActive, newVal => {
  if (newVal) showReadyTips.value = true
})

</script>

<style lang="less" scoped>
  .capture-wrap {
    @size: 200px;
    position: fixed;
    left: 50%;
    top: 20%;
    margin-left: -(@size / 2);
    width: @size;
    .video-wrap {
      width: 100%;
      height: @size;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>