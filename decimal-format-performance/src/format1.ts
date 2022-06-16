const FORMATTERS = {}


export default function format1(val: number, digits: number = 2): string {
  let formatter = FORMATTERS[digits]
  if (!formatter) {
    formatter = new Intl.NumberFormat(undefined, {
      useGrouping: true,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    })
    FORMATTERS[digits] = formatter
  }
  return formatter.format(val)
}
