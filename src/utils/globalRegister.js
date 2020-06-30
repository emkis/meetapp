import { upperFirst, camelCase } from 'lodash'

/**
 * Automatic Global Registration of Base Components
 *
 * More information on VueJS Docs
 * https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
 */

function globalComponentRegistration(VueInstance) {
  const requireComponent = require.context(
    '@/components/global',
    false,
    /Base[A-Z]\w+\.(vue|js)$/
  )

  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)

    const componentName = upperFirst(
      camelCase(
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )

    VueInstance.component(
      componentName,
      componentConfig.default || componentConfig
    )
  })
}

export default globalComponentRegistration
