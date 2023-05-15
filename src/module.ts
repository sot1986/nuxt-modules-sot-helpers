import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  /** default delay for debounce function if not specified, @default 500 */
  debounceDelay: number
  /** default delay for throttle function if not specified, @default 500 */
  throttleDelay: number

  notificationTimer: number
}

export * from './runtime/types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'sot-helpers',
    configKey: 'sotHelpers',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    debounceDelay: 500,
    throttleDelay: 500,
    notificationTimer: 3000,
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.sotHelpers = defu(nuxt.options.runtimeConfig.public.sotHelpers, {
      debounceDelay: options.debounceDelay,
      throttleDelay: options.throttleDelay,
      notificationTimer: options.notificationTimer,
    }) as ModuleOptions

    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./runtime', 'composables'))

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime', 'plugins'))
  },
})
