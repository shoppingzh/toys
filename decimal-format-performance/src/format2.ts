export default function format2(val: number, digits: number = 2): string {
  const parts = val.toFixed(digits).split('.')
  const integer = parseInt(parts[0])
  const fraction = parts[1]
  
  return `${integer.toLocaleString()}.${fraction}`
}
