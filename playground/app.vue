<script setup lang="ts">
import { useNotifications } from '#imports'

const { notifications, addNotification, lastIndex, closeNotification } = useNotifications()

function notify() {
  addNotification({
    message: `notification number ${lastIndex.value}`,
    type: 'success',
  })
}
</script>

<template>
  <div>
    <p>Converted object</p>

    <button id="add" @click="notify">
      add
    </button>

    <ul>
      <li v-for="notification in notifications" :key="notification.id">
        <span @click="closeNotification(notification)">{{ notification.message }}</span>
      </li>
    </ul>
  </div>
</template>
