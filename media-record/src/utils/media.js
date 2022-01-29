/**
 * 播放音频
 * @param {String} src 地址
 */
export function playAudio(src) {
  const el = document.createElement('audio')
  el.src = src
  const timeupdateHandler = () => {
    const curr = el.currentTime
    const total = el.duration
    if (curr >= total) {
      el.removeEventListener('timeupdate', timeupdateHandler)
      document.body.removeChild(el)
    }
  }
  el.addEventListener('timeupdate', timeupdateHandler)
  el.style.display = 'none'
  document.body.appendChild(el)
  el.play()
}
