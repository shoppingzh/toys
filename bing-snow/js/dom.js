const { width: cw, height: ch } = getViewport()
const density = cw * ch / 255
const speed = 30000 // N秒一帧

function createSnow() {
  const el = document.createElement('div')
  const size = random(1, 4)
  css(el, {
    width: size,
    height: size,
    borderRadius: `50%`,
    backgroundColor: `rgba(255, 255, 255, ${random(0.2, .8)})`
  })
  addClass(el, 'snow')
  return el
}

function createFrame(count = 1000) {
  const container = document.createElement('div')
  css(container, {
    'transition-duration': `${speed}ms`
  })
  addClass(container, 'snow-wrap')
  for (let i = 0; i < count; i++) {
    const el = createSnow()
    css(el, {
      left: `${random(1, cw) - el.clientWidth}px`,
      top: `${random(1, ch) - el.clientHeight}px`
    })
    el.setAttribute('desc', `我是第${i}号雪花`)
    container.append(el)
  }
  document.body.append(container)
  const transitionEndHandler = () => {
    document.body.removeChild(container)
    container.removeEventListener('transitionend', transitionEndHandler)
  }
  container.addEventListener('transitionend', transitionEndHandler)
  return container
}

(function start() {
  const frame = createFrame(density)// 上帧结束后，下帧马上开始
  setTimeout(() => {
    // 开始动画
    css(frame, {
      transform: 'translate(0, 100%)'
    })
  }, 30)
  setTimeout(() => {
    start()
  }, (speed - 30) / 2)
})();
