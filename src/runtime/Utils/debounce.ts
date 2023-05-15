import type { ModuleOptions } from '../../module'
import { useRuntimeConfig } from '#imports'

export default function<T extends unknown[]>(
  fn: (...parameters: T) => void | Promise<void>,
  delay = (useRuntimeConfig().public.sotHelpers as ModuleOptions).debounceDelay,
): (...args: T) => void {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: T) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      void fn(...args)
    }, delay)
  }
}
