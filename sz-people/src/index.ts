const excel = `
1	2012	1195.85
2	2013	1257.17
3	2014	1317.86
4	2015	1408.05
5	2016	1495.35
6	2017	1587.31
7	2018	1666.12
8	2019	1710.4
9	2020	1763.38
10	2021	1768.16
`

interface Info {
  year: string
  value: number
}

function getInfo(cols: string[]): Info {
  return {
    year: cols[1],
    value: Number.parseFloat(cols[2])
  }
}

function fmtPercent(value: number): string {
  return `${(value * 100).toLocaleString()}%`
}

const lines: Info[] = excel.split(/\n/g)
  .filter(line => line.trim())
  .map(line => getInfo(line.split(/\s+/g)))

for (let i = 0, len = lines.length; i < len; i++) {
  if (i <= 0) continue
  const last = lines[i - 1]
  const curr = lines[i]
  console.log({
    '年份': `${last.year} ~ ${curr.year}`,
    '增速': fmtPercent((curr.value - last.value) / last.value),
  })
}
