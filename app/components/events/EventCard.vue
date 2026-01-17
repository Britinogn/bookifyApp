<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
    <h3 class="text-xl font-bold mb-2">{{ event.Name }}</h3>
    <p class="text-gray-600 mb-4">{{ event.Description }}</p>
    
    <div class="space-y-2 text-sm text-gray-500">
      <p>📍 {{ event.Location }}</p>
      <p>📅 {{ formatDate(event.dateTime)  }}</p>
    </div>

    <NuxtLink
      :to="`/events/${event.id}`"
      class="mt-4 inline-block text-blue-600 hover:text-blue-800"
    >
      View Details →
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types'

defineProps<{
  event: Event
}>()

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString()
}
</script>