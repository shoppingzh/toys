function random(min, max) {
  const minValue = Math.min(min, max)
  const maxValue = Math.max(min, max)
  const offset = maxValue - minValue
  return Math.random() * offset + min
}
