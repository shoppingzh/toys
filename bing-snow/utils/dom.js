function css(el, styles) {
  Object.keys(styles).forEach(name => {
    el.style[name] = styles[name]
  })
}

function addClass(el, classes) {
  classes.split(/\s+/).forEach(cls => {
    el.classList.add(cls)
  })
}

function removeClass(el, classes) {
  classes.split(/\s+/).forEach(cls => {
    el.classList.remove(cls)
  })
}

function getViewport() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight
  }
}