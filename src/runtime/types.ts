import type { ComputedRef } from 'vue-demi'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const NotificationType = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  notification: 'notification',
} as const

export interface Notification {
  id: number
  title?: string
  message: string
  type: keyof typeof NotificationType
}

export interface RouteHelpers {
  getRouteParam: ComputedRef<(<T extends string>(payload: {
    name: string
    defaultValue?: T | undefined
    r?: RouteLocationNormalizedLoaded | undefined
  }) => T extends string ? string : string | undefined)>

}

export type Debounce = <T extends unknown[]>(fn: (...parameters: T) => void | Promise<void>, delay?: number) => (...args: T) => void

export type Throttle = <T extends unknown[]>(fn: (...args: T) => void | Promise<void>, delay?: number) => (...args: T) => void

export type UniqueId = () => string

export interface HelpersI {
  route: RouteHelpers
  debounce: Debounce
  throttle: Throttle
  uniqueId: UniqueId
}
