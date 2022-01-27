const modules = import.meta.globEager('./*/index.vue')

function getComponentName(path) {
  const re = new RegExp(/[/\\](\w+)[/\\]index.vue$/g)
  const result = re.exec(path)
  return result ? result[1] : null
}

export default function(app, options) {
  Object.keys(modules).forEach(path => {
    const component = modules[path].default
    if (!component) return
    const componentName = getComponentName(component.__file)
    if (!componentName) return
    app.component(componentName, component)
  })
}
