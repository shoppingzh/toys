export default function format3(val: number, digits: number = 2): string {
  const integer = Math.trunc(val)
  const fraction = val % 1
  return `${integer.toLocaleString()}.${fraction.toFixed(digits).split('.')[1]}`
}