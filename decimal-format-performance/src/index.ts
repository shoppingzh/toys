import format1 from './format1'
import format2 from './format2'
import format3 from './format3'

const formats = [
  format1,
  format2,
  format3
]

function random(max: number = 10000) {
  return Math.random() * max
}

const numbers = new Array(10000).fill(0).map(o => random())
const loopCount = 10
const times = formats.map(o => new Array(loopCount).fill(0))

console.log(`数值数目：${numbers.length}`)

for(let i = 0; i < loopCount; i++) {

  console.log(`====== 第${i + 1}轮 ======`)

  let log = ''
  formats.forEach((format, index) => {
    const start = performance.now()
    numbers.forEach(val => {
      format(val)
    })
    const end = performance.now()
    const use = end - start
    times[index][i] = end - start
    log += `${Math.round(use)}ms \t`
  })
  console.log(log)
  console.log()
}

console.log('====== 平均 ======')
let log = ''
times.forEach(arr => {
  const use = arr.reduce((sum, o) => sum + o, 0)
  log += `${use / loopCount}ms \t`
})
console.log(log)
