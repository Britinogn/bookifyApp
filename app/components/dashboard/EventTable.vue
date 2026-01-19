<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <!-- Table Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <h3 class="text-lg font-semibold text-gray-800">Your Created Events</h3>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      <p class="text-gray-600 mt-4">Loading events...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!events || events.length === 0" class="p-12 text-center">
      <div class="text-6xl mb-4">📅</div>
      <h3 class="text-xl font-semibold text-gray-800 mb-2">No events yet</h3>
      <p class="text-gray-600 mb-6">Create your first event to get started!</p>
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Event Name
            </th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Location
            </th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date & Time
            </th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="event in events"
            :key="event.id"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="font-semibold text-gray-800">{{ event.name }}</div>
              <div class="text-sm text-gray-600 line-clamp-1">{{ event.description }}</div>
            </td>
            <td class="px-6 py-4 text-gray-700">
              {{ event.location }}
            </td>
            <td class="px-6 py-4 text-gray-700">
              {{ formatDate(event.date_time) }}
            </td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button
                  @click="$emit('edit', event)"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(event)"
                  class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="showDeleteConfirm = false"
    >
      <div class="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
        <div class="text-center mb-6">
          <div class="text-6xl mb-4">⚠️</div>
          <h3 class="text-xl font-bold text-gray-800 mb-2">Delete Event?</h3>
          <p class="text-gray-600">
            Are you sure you want to delete "<span class="font-semibold">{{ eventToDelete?.name }}</span>"? This action cannot be undone.
          </p>
        </div>

        <div class="flex gap-4">
          <button
            @click="showDeleteConfirm = false"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            :disabled="deleting"
            class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400"
          >
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types'

defineProps<{
  events: Event[] | null
  loading?: boolean
}>()

const emit = defineEmits<{
  edit: [event: Event]
  deleted: []
}>()

const { deleteEvent } = useEvents()

const showDeleteConfirm = ref(false)
const eventToDelete = ref<Event | null>(null)
const deleting = ref(false)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function confirmDelete(event: Event) {
  eventToDelete.value = event
  showDeleteConfirm.value = true
}

async function handleDelete() {
  if (!eventToDelete.value) return

  deleting.value = true

  const result = await deleteEvent(eventToDelete.value.id)

  deleting.value = false

  if (!result.error) {
    showDeleteConfirm.value = false
    eventToDelete.value = null
    emit('deleted')
  }
}
</script>