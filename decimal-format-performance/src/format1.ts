
export default function format1(val: number, digits: number = 2): string {
  return val.toLocaleString(undefined, {
    useGrouping: true,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  })
}
