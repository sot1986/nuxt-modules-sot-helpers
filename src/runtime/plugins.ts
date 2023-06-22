import debounce from './Utils/debounce'
import throttle from './Utils/throttle'
import uniqueId from './Utils/uniqueId'
import { computed, defineNuxtPlugin, useRoute } from '#imports'

export default defineNuxtPlugin(() => {
  const route = useRoute()

  const getRouteParam = computed(() => <T extends string>(
    payload: {
      name: string
      defaultValue?: T
      r?: ReturnType<typeof useRoute>
    }): T extends string
      ? string
      : undefined | string => {
    const { params } = payload.r ?? route

    if (payload.name in params) {
      const param = params[payload.name]

      if (typeof param === 'string')
        return param
    }

    return payload.defaultValue as T extends string ? string : undefined | string
  })

  return {
    provide: {
      helpers: {
        route: {
          getRouteParam,
        },
        debounce,
        throttle,
        uniqueId,
      },
    },
  }
})
