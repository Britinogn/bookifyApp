<template>
  <div class="bg-black text-yellow-400  rounded-lg shadow-md p-6 hover:shadow-lg transition">
    <h3 class="text-xl font-bold mb-2">{{ event.name }}</h3>
    <p class="text-gray-200 mb-4">{{ event.description }}</p>
    
    <div class="space-y-2 text-sm text-gray-400">
      <p>📍 {{ event.location }}</p>
      <p>📅 {{ formatDate(event.date_time)  }}</p>
    </div>

    <NuxtLink
      :to="`/events/${event.id}`"
      class="mt-4 inline-block text-blue-500 hover:text-blue-600"
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