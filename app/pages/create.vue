<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <h1 class="text-3xl font-bold mb-8">Create New Event</h1>

    <form @submit.prevent="handleCreate" class="space-y-6">
      <div>
        <label class="block text-sm font-medium">Event Name</label>
        <input
          v-model="event.name"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Description</label>
        <textarea
          v-model="event.description"
          required
          rows="4"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium">Location</label>
        <input
          v-model="event.location"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Date & Time</label>
        <input
          v-model="event.date_time"
          type="datetime-local"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div v-if="errorMsg" class="text-red-500">{{ errorMsg }}</div>

      <button
        type="submit"
        class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Create Event
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { createEvent } = useEvents()
const router = useRouter()

const event = ref({
  name: '',
  description: '',
  location: '',
  date_time: ''
})

const errorMsg = ref('')

const handleCreate = async () => {
  errorMsg.value = ''
  
  const result = await createEvent(event.value)
  
  if (result.error) {
    errorMsg.value = 'Failed to create event'
  } else {
    router.push('/')
  }
}
</script>