<script setup lang="ts">
import { defineComponent, useHelpers } from '#imports'

const { route: { getRouteParam } } = useHelpers()
</script>

<script lang="ts">
export default defineComponent({
  name: 'UserPage',
  inheritAttrs: false,
})
</script>

<template>
  <div id="param-id">
    {{ getRouteParam({ name: 'userId' }) }}
  </div>
</template>
