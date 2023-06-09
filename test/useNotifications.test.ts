import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import useNotifications from '../src/runtime/composables/useNotifications'
import { NotificationType } from '../src/module'

describe('test use notifications composables', () => {
  beforeEach(() => {
    vi.mock('#imports', () => ({ ref, useRuntimeConfig: () => ({ public: { sotHelpers: { notificationTimer: 3000 } } }) }))

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it ('at start there are no notifications', () => {
    const { lastIndex } = useNotifications()

    expect(lastIndex.value).toBe(0)
  })

  it.each([
    NotificationType.error,
    NotificationType.warning,
  ]) ('notifications can be added', async (type) => {
    const time = vi.setSystemTime(new Date('2023-08-10T00:00:00Z'))

    const { lastIndex, notifications, addNotification } = useNotifications()

    await addNotification({
      message: 'test',
      type,
    })

    expect(notifications.value.at(0)).toEqual({
      id: 1,
      type,
      message: 'test',
    })

    expect(lastIndex.value).toBe(1)

    time.advanceTimersByTime(3001)

    expect(notifications.value).toEqual([])
  })

  it('notifications with same message are not added', async () => {
    const { lastIndex, addNotification } = useNotifications()

    await addNotification({
      message: 'test',
      type: 'error',
    })

    expect(lastIndex.value).toBe(1)

    await addNotification({
      message: 'test',
      type: 'notification',
    })

    expect(lastIndex.value).toBe(1)
  })

  it ('notifications can be closed before expires', async () => {
    const time = vi.setSystemTime(new Date('2023-08-10T00:00:00Z'))

    const { lastIndex, addNotification, closeNotification, notifications } = useNotifications()

    const firstIndex = await addNotification({
      message: 'test 1',
      type: 'error',
    })

    expect(lastIndex.value).toBe(1)

    time.advanceTimersByTime(200)

    const secondIndex = await addNotification({
      message: 'test 2',
      type: 'error',
    })

    expect(secondIndex).toBe(2)

    time.advanceTimersByTime(200)

    expect(notifications.value.length).toBe(2)

    closeNotification(secondIndex)

    expect(lastIndex.value).toBe(2)

    expect(notifications.value.length).toBe(1)

    closeNotification(firstIndex)

    expect(notifications.value.length).toBe(0)
  })
})
