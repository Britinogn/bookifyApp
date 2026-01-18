<template>
    <div class="min-h-screen bg-gray-50 py-12 pt-32 ">
        <div class="container mx-auto px-4 max-w-4xl">
        
            <!-- Loading State -->
            <div v-if="pending" class="text-center py-20">
                <div class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                <p class="text-gray-600 mt-4">Loading event...</p>
            </div>
            
            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
                <p class="text-red-600 font-semibold">Error loading event: {{ error }}</p>
            </div>

            <!-- Event Content -->
            <div v-else-if="event" class="bg-white rounded-lg shadow-md overflow-hidden">
                
                <!-- Header -->
                <div class="bg-blue-600 p-8 text-white">
                <h1 class="text-4xl font-bold mb-2">{{ event.name }}</h1>
                <p class="text-blue-100 text-sm">Event ID: {{ event.id }}</p>
                </div>

                <!-- Body -->
                <div class="p-8 space-y-8">
                
                <!-- Description -->
                <section>
                    <h2 class="text-2xl font-semibold text-gray-800 mb-3">Description</h2>
                    <p class="text-gray-700 leading-relaxed">{{ event.description }}</p>
                </section>
                
                <!-- Details Grid -->
                <section class="grid md:grid-cols-2 gap-6">
                    <div class="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <span class="text-2xl">📍</span>
                    <div>
                        <p class="text-sm text-gray-500 font-medium mb-1">Location</p>
                        <p class="text-gray-800 font-semibold">{{ event.location }}</p>
                    </div>
                    </div>
                    
                    <div class="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <span class="text-2xl">📅</span>
                    <div>
                        <p class="text-sm text-gray-500 font-medium mb-1">Date & Time</p>
                        <p class="text-gray-800 font-semibold">{{ formatDate(event.date_time) }}</p>
                    </div>
                    </div>
                </section>

                <!-- Actions -->
                <section v-if="isAuthenticated" class="space-y-4">
                    <div class="grid md:grid-cols-2 gap-4">
                    <button
                        @click="handleRegister"
                        class="px-6 py-3 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                        Register for Event
                    </button>
                    
                    <button
                        @click="handleCancel"
                        class="px-6 py-3 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                    >
                        Cancel Registration
                    </button>
                    </div>

                    <!-- Message -->
                    <div v-if="message" class="p-4 rounded-lg font-medium" :class="messageClass">
                    {{ message }}
                    </div>
                </section>

                <!-- Login Prompt -->
                <section v-else class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <p class="text-yellow-800 mb-4">Please login to register for this event</p>
                    <NuxtLink 
                    to="/auth/login" 
                    class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                    Go to Login
                    </NuxtLink>
                </section>
                </div>

                <!-- Footer -->
                <div class="px-8 pb-8">
                <NuxtLink 
                    to="/events" 
                    class="inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors"
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

useSeoMeta({    
    title: `${event.value?.name || 'Event Details'} - Bookify`,
    description: event.value?.description || 'View event details and book your tickets',
    ogTitle: `${event.value?.name || 'Event Details'} - Bookify`,
    ogDescription: event.value?.description || 'View event details and book your tickets',
    ogType: 'website'
})


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
        messageClass.value = 'bg-red-100  text-red-700 border border-red-300'
    } else {
        message.value = 'Registration cancelled successfully'
        messageClass.value = 'bg-yellow-100  text-yellow-700 border border-yellow-300'
    }
    
    setTimeout(() => {
        message.value = ''
    }, 5000)
}
</script>