function parseFruits(text) {
  if (!text) return []
  const names = []
  const lines = text.split(/\r|\r\n|\n/)
  for (const line of lines) {
    if (!line) continue
    for (const item of line.split(/、/)) {
      if (names.indexOf(item) < 0) {
        names.push(item)
      }
    }
  }

  const fruits = []
  let id = 0
  for (const name of names) {
    fruits.push({
      id: ++id,
      name
    })
  }
  return fruits
}

module.exports = {
  parseFruits
}
