<template>
    <div class="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12">
        <div class="container mx-auto px-4">
        
        <div v-if="pending" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            <p class="text-gray-600 mt-4">Loading event...</p>
        </div>
        
        <div v-else-if="error" class="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
            <p class="text-red-600 font-semibold">Error loading event: {{ error }}</p>
        </div>

        <div v-else-if="event" class="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
            
            <!-- Event Header -->
            <div class="bg-linear-to-r from-yellow-600 to-yellow-600  p-8 text-white">
            <h1 class="text-5xl font-bold mb-2">{{ event.name }}</h1>
            <p class="text-blue-100">Event ID: {{ event.id }}</p>
            </div>

            <!-- Event Details -->
            <div class="p-8">
                <div class="mb-8">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
                    <p class="text-gray-700 text-lg leading-relaxed">{{ event.description }}</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6 mb-8">
                    <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                        <span class="text-3xl">📍</span>
                        <!-- <i class="fa-location"></i> -->
                        <div>
                            <p class="text-sm text-gray-500 font-medium">Location</p>
                            <p class="text-gray-800 font-semibold">{{ event.location }}</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                        <span class="text-3xl">📅</span>
                        <div>
                            <p class="text-sm text-gray-500 font-medium">Date & Time</p>
                            <p class="text-gray-800 font-semibold">{{ formatDate(event.date_time) }}</p>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div v-if="isAuthenticated" class="space-y-4">
                    <div class="flex gap-4">
                    <button
                        @click="handleRegister"
                        class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold shadow-md"
                    >
                        ✓ Register for Event
                    </button>
                    
                    <button
                        @click="handleCancel"
                        class="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold shadow-md"
                    >
                        ✗ Cancel Registration
                    </button>
                    </div>

                    <div v-if="message" class="p-4 rounded-lg font-medium" :class="messageClass">
                    {{ message }}
                    </div>
                </div>

                <div v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <p class="text-yellow-800 mb-4">Please login to register for this event</p>
                    <NuxtLink to="/auth/login" class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Go to Login
                    </NuxtLink>
                </div>
            </div>

            <!-- Back Button -->
            <div class="px-8 pb-8">
            <NuxtLink 
                to="/events" 
                class="inline-block text-blue-600 hover:text-blue-800 font-medium"
            >
                ← Back to all events
            </NuxtLink>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getEventById, registerForEvent, cancelRegistration } = useEvents()
const { isAuthenticated } = useAuth()

const eventId = computed(() => Number(route.params.id))
const message = ref('')
const messageClass = ref('')

const { data: event, error, pending } = await useAsyncData(
    `event-${eventId.value}`,
    async () => {
        const { data } = await getEventById(eventId.value)
        return data
    }
)


// async function fetchEvent() {
//     const {data} = await getEventById(eventId.value)
//     return  data
// }

// const {data: event, error, pending} = useAsyncData(
//     `event-${eventId.value}`,
//     fetchEvent
// )



const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const handleRegister = async () => {
    const result = await registerForEvent(eventId.value)
    if (result.error) {
        message.value = 'Failed to register for event'
        messageClass.value = 'bg-red-100 text-red-700 border border-red-300'
    } else {
        message.value = '✓ Successfully registered for this event!'
        messageClass.value = 'bg-green-100 text-green-700 border border-green-300'
    }
    
    setTimeout(() => {
        message.value = ''
    }, 5000)
}

const handleCancel = async () => {
    const result = await cancelRegistration(eventId.value)
    if (result.error) {
        message.value = 'Failed to cancel registration'
        messageClass.value = 'bg-red-100 text-red-700 border border-red-300'
    } else {
        message.value = 'Registration cancelled successfully'
        messageClass.value = 'bg-yellow-100 text-yellow-700 border border-yellow-300'
    }
    
    setTimeout(() => {
        message.value = ''
    }, 5000)
}
</script>