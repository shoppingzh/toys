const imgs = new Array(10).fill(0).map((o, index) => `${index + 1}.jpg`)

let bgIndex = 0

function toBg(index) {
  if (index < 0) {
    index = imgs.length - 1
  }
  if (index > imgs.length - 1) {
    index = 0
  }
  bgIndex = index
  css(document.body, {
    backgroundImage: `url(../bg/${bgIndex + 1}.jpg)`
  })
}

function prevBg() {
  toBg(bgIndex - 1)
}

function nextBg() {
  toBg(bgIndex + 1)
}

document.addEventListener('DOMContentLoaded', e => {
  document.querySelector('.button-prev').addEventListener('click', e => {
    prevBg()
  })
  document.querySelector('.button-next').addEventListener('click', e => {
    nextBg()
  })
})

