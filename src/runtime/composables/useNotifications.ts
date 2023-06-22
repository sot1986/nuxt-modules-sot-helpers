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
    addNotification: (notification: Omit<Notification, 'id'>, expiration?: number) => Promise<number | null>
    closeNotification: (notification: Pick<Notification, 'id'> | number) => void
    addSilenceId: (value: string) => void
  } {
  const { notificationTimer } = useRuntimeConfig().public.sotHelpers as ModuleOptions

  const notifications = ref<Notification[]>([])

  const silenceId = ref<string[]>([])

  const lastIndex = ref(0)

  function addNotification(notification: Omit<Notification, 'id'>, expiration?: number): Promise<number | null> {
    return new Promise<number | null>((resolve) => {
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

  function closeNotification(notification: Pick<Notification, 'id'> | number) {
    const id = typeof notification === 'number' ? notification : notification.id

    const index = notifications.value.findIndex(n => n.id === id)

    if (index < 0)
      return

    notifications.value.splice(index, 1)
  }

  function addSilenceId(value: string) {
    silenceId.value.push(value)
  }

  return {
    addNotification,
    closeNotification,
    addSilenceId,
    notifications,
    lastIndex,
  }
}
