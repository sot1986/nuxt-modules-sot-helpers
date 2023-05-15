<script setup lang="ts">
import { useNotifications } from '#imports'

const { notifications, addNotification, lastIndex } = useNotifications()
</script>

<template>
  <div>
    <p>Converted object</p>

    <button id="add">
      add
    </button>

    <ul>
      <li v-for="notification in notifications" :key="notification.id">
        {{ notification.message }}
      </li>
    </ul>
  </div>
</template>
