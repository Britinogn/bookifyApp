<template>
  <div class="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
    <!-- Event Image/Banner -->
    <div class="relative h-48 bg-blue-600 overflow-hidden">
      <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
      
      <!-- Category Badge -->
      <div class="absolute top-4 left-4">
        <!-- <span class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-blue-600">
          {{ event.category || 'Event' }}
        </span> -->
      </div>

      <!-- Featured/Star Badge -->
      <div class="absolute top-4 right-4">
        <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
      </div>

      <!-- Event Title Overlay -->
      <div class="absolute bottom-0 left-0 right-0 p-4 bg-black/60">
        <h3 class="text-xl font-bold text-white line-clamp-2">{{ event.name }}</h3>
      </div>
    </div>

    <!-- Card Content -->
    <div class="p-5">
      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ event.description }}
      </p>

      <!-- Event Details -->
      <div class="space-y-2.5 mb-4">
        <!-- Date & Time -->
        <div class="flex items-start gap-2.5">
          <div class="shrink-0 w-5 h-5 mt-0.5">
            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke-width="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke-width="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900">{{ formatDate(event.date_time) }}</p>
            <p class="text-xs text-gray-500">{{ formatTime(event.date_time) }}</p>
          </div>
        </div>

        <!-- Location -->
        <div class="flex items-start gap-2.5">
          <div class="shrink-0 w-5 h-5 mt-0.5">
            <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="2"/>
              <circle cx="12" cy="10" r="3" stroke-width="2"/>
            </svg>
          </div>
          <p class="text-sm text-gray-700 line-clamp-1 flex-1 min-w-0">{{ event.location }}</p>
        </div>

        <!-- Price (if available) -->
        <!-- <div v-if="event.price" class="flex items-center gap-2.5">
          <div class="flex-shrink-0 w-5 h-5">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <line x1="12" y1="1" x2="12" y2="23" stroke-width="2"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-width="2"/>
            </svg>
          </div>
          <p class="text-sm font-semibold text-gray-900">
            {{ formatPrice(event.price) }}
          </p>
        </div> -->
      </div>

      <!-- Action Button -->
      <NuxtLink
        :to="`/events/${event.id}`"
        class="block w-full text-center px-4 py-2.5 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
      >
        View Details & Book
        <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </NuxtLink>
    </div>

    <!-- Hover Effect Border -->
    <div class="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/20 rounded-xl pointer-events-none transition-colors duration-300"></div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types'

defineProps<{
  event: Event
}>()

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}
</script>