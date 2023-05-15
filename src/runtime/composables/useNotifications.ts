import type { Ref } from 'vue'
import type { Notification } from '../types'
import type { ModuleOptions } from '../../module'
import { ref, useRuntimeConfig } from '#imports'

export default function (
  defaultTimes?: {
    error?: number
    warning?: number
    success?: number
    notification?: number
  },
): {
    notifications: Ref<Notification[]>
    lastIndex: Ref<number>
    addNotification: (notification: Omit<Notification, 'id'>, expiration?: number) => Promise<number>
  } {
  const { notificationTimer } = useRuntimeConfig().public.sotHelpers as ModuleOptions

  const notifications = ref<Notification[]>([])

  const lastIndex = ref(0)

  function addNotification(notification: Omit<Notification, 'id'>, expiration?: number): Promise<number> {
    return new Promise<number>((resolve) => {
      const idx = notifications.value.findIndex(n => n.message === notification.message)

      if (idx >= 0)
        return resolve(notifications.value[idx].id)

      const newIndex = lastIndex.value + 1

      notifications.value.push({
        ...notification,
        id: newIndex,
      })

      const milliseconds = expiration
      ?? (defaultTimes ? defaultTimes[notification.type] : notificationTimer) ?? notificationTimer

      setTimeout(() => {
        const removeIndex = notifications.value.findIndex(n => n.id === newIndex)

        if (removeIndex >= 0)
          notifications.value.splice(removeIndex, 1)
      }, milliseconds)

      lastIndex.value += 1

      return resolve(newIndex)
    })
  }

  return {
    addNotification,
    notifications,
    lastIndex,
  }
}
