
import Observer from './Observer'
import ObserveSource from './ObserveSource'

const source = new ObserveSource()
const o1 = new Observer(() => {
  console.log('o1 update')
})

source.addObserver(o1)

setTimeout(() => {
  source.notify()
}, 2000)
