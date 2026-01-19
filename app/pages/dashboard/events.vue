<template>
  <div>
    <!-- Page Header with Create Button -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">My Events</h1>
        <p class="text-gray-600 mt-2">Manage all your created events</p>
      </div>
      <button
        @click="openCreateModal"
        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
      >
        <span class="text-xl">+</span>
        Create Event
      </button>
    </div>

    <!-- Events Table -->
    <DashboardMyEventsTable
      :events="events"
      :loading="pending"
      @edit="openEditModal"
      @deleted="refreshEvents"
    />

    <!-- Event Modal (Create/Edit) -->
    <DashboardEventModal
      :isOpen="showModal"
      :event="selectedEvent"
      @close="closeModal"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { getAllEvents } = useEvents()

const showModal = ref(false)
const selectedEvent = ref<Event | null>(null)

// Fetch user's events
const { data: events, pending, refresh } = await useAsyncData('my-events', async () => {
  const { data } = await getAllEvents()
  // TODO: Filter to only show events created by current user
  // For now, returning all events
  return data
})

function openCreateModal() {
  selectedEvent.value = null
  showModal.value = true
}

function openEditModal(event: Event) {
  selectedEvent.value = event
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedEvent.value = null
}

async function handleSuccess() {
  await refreshEvents()
}

async function refreshEvents() {
  await refresh()
}
</script>