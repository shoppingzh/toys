import { onUnmounted, ref } from 'vue'

export default function(cb, interval) {

  const seconds = ref(0)

  const timer = setInterval(() => {
    seconds.value++
    cb && cb(seconds.value)
  }, interval * 1000)

  const stop = () => {
    clearInterval(timer)
  }

  onUnmounted(() => {
    stop()
  })

  return {
    stop
  }
}