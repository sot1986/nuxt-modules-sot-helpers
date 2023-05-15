import type { ModuleOptions } from '../../module'
import { useRuntimeConfig } from '#imports'

export default function<T extends unknown[]>(
  fn: (...args: T) => void | Promise<void>,
  delay = (useRuntimeConfig().public.sotHelpers as ModuleOptions).throttleDelay,
): (...args: T) => void {
  let shouldWait = false
  let waitingArgs: T | null = null

  const timeoutFunc = () =>
    setTimeout(() => {
      if (!waitingArgs) {
        shouldWait = false
        return
      }
      void fn(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }, delay)

  return (...args: T) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    void fn(...args)
    shouldWait = true

    setTimeout(timeoutFunc, delay)
  }
}
