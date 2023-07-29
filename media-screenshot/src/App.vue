<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <img ref="img" class="w-0 h-0 transition-all duration-500">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const video = ref<HTMLVideoElement>()
const img = ref<HTMLImageElement>()

async function getFrames(time: number) {
  return new Promise<Blob[]>(async(resolve, reject) => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true
    })
    const chunks: Blob[] = []
    const recorder = new MediaRecorder(stream)

    recorder.ondataavailable = e => {
      console.log(e)
      chunks.push(e.data)
    }

    recorder.onstop = e => {
      resolve(chunks)
    }

    recorder.start()

    setTimeout(() => {
      recorder.stop()
      stream.getTracks().forEach(t => t.stop())
    }, time)
  })
}

async function init() {
  const blobs = await getFrames(500)
  const blob = new Blob(blobs, { type: 'video/mp4' })
  const url = URL.createObjectURL(blob)
  video.value = document.createElement('video')
  video.value.width = document.documentElement.clientWidth
  video.value.height = window.innerHeight
  video.value.muted = true
  video.value.controls = true
  video.value.src = url
  // video.value?.muted = true
  
  video.value?.addEventListener('timeupdate', () => {
    console.log('开始画图')
    const canvas = document.createElement('canvas')
    canvas.width = 1000
    canvas.height = 800
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video.value, 0, 0, canvas.width, canvas.height)

    const url = canvas.toDataURL('image/png')
    img.value.src = url
    img.value?.classList.add('active')
  })
  video.value?.play()
}


init()
</script>

<style scoped>
.active {
  @apply w-[80%] h-[80%];
}
</style>
