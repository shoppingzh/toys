const moduleLoader = require.context('.', true, /index\.js$/)
const components = moduleLoader.keys().map(path => moduleLoader(path).default).filter(module => module && module.install)

export default function(app) {
  components.forEach(component => {
    app.use(component)
  })
}
