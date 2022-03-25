import fruits from '@/data/fruits'
import month_fruits from '@/data/month_fruits'

export function listInMonth(no) {
  return new Promise((resolve, reject) => {
    const monthItem = month_fruits.find(o => o.no === no)
    if (!monthItem) return reject()
    const ids = monthItem.fruits
    resolve(fruits.filter(o => ids.indexOf(o.id) >= 0))
  })
}
