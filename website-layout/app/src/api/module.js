const MODULE_KEY = '_modules'

export function list() {
  const str = localStorage.getItem(MODULE_KEY)
  if (!str) return []
  return JSON.parse(str)
}

export function save(modules) {
  localStorage.setItem(MODULE_KEY, JSON.stringify(modules))
}

export function clear() {
  localStorage.removeItem(MODULE_KEY)
}
