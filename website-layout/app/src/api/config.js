const CONFIG_KEY = '_config'

export function get() {
  const str = localStorage.getItem(CONFIG_KEY)
  return str ? JSON.parse(str) : {
    layout: 0,
    width: 1200,
    type: 'column',
    columns: '1:3:1'
  }
}

export function save(config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}