import { getUserMedia } from 'tongpo/lib/media'
import { computed, onUnmounted, ref } from 'vue'

export default function(constraints) {
  const stream = ref(null)
  const active = computed(() => !!stream.value)

  const onStop = () => {
    stream.value = null
  }

  const start = () => {
    return new Promise(async(resolve, reject) => {
      try {
        stream.value = await getUserMedia(constraints)
        stream.value.oninactive = onStop
        resolve(stream.value)
      } catch (error) {
        reject(error)
      }
    })
  }

  const stop = () => {
    return new Promise((resolve, reject) => {
      if (!stream.value) return reject('已关闭')
      stream.value.getTracks().forEach(t => t.stop())
    })
  }

  onUnmounted(() => {
    stop()
  })

  return {
    stream,
    active,
    start,
    stop
  }
}
