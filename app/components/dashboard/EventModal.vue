<template>
  <!-- Modal Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click.self="closeModal"
  >
    <!-- Modal Content -->
    <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ isEditMode ? 'Edit Event' : 'Create New Event' }}
        </h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <span class="text-3xl">&times;</span>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-6">
          <!-- Event Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Event Name *
            </label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event name"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              v-model="formData.description"
              required
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your event"
            ></textarea>
          </div>

          <!-- Location -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Location *
            </label>
            <input
              v-model="formData.location"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Event location"
            />
          </div>

          <!-- Date & Time -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Date & Time *
            </label>
            <input
              v-model="formData.date_time"
              type="datetime-local"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-red-600 text-sm">{{ errorMessage }}</p>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex gap-4 mt-8">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Saving...' : (isEditMode ? 'Update Event' : 'Create Event') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types'

const props = defineProps<{
  isOpen: boolean
  event?: Event | null
}>()

const emit = defineEmits<{
  close: []
  success: []
}>()

const { createEvent, updateEvent } = useEvents()

const isEditMode = computed(() => !!props.event)
const loading = ref(false)
const errorMessage = ref('')

const formData = reactive({
  name: '',
  description: '',
  location: '',
  date_time: ''
})

// Watch for event prop changes to populate form in edit mode
watch(() => props.event, (newEvent) => {
  if (newEvent) {
    formData.name = newEvent.name
    formData.description = newEvent.description
    formData.location = newEvent.location
    formData.date_time = newEvent.date_time
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  formData.name = ''
  formData.description = ''
  formData.location = ''
  formData.date_time = ''
  errorMessage.value = ''
}

function closeModal() {
  resetForm()
  emit('close')
}

async function handleSubmit() {
  loading.value = true
  errorMessage.value = ''

  try {
    if (isEditMode.value && props.event) {
      // Update existing event
      const result = await updateEvent(props.event.id, formData)
      if (result.error) {
        errorMessage.value = 'Failed to update event'
      } else {
        emit('success')
        closeModal()
      }
    } else {
      // Create new event
      const result = await createEvent(formData)
      if (result.error) {
        errorMessage.value = 'Failed to create event'
      } else {
        emit('success')
        closeModal()
      }
    }
  } catch (error) {
    errorMessage.value = 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>