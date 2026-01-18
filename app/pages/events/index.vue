<template>
    <div class="min-h-screen bg-gray-50">
        <div class="container mx-auto px-4 py-8 pt-24">
        
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-2">All Events</h1>
                <p class="text-gray-600">Discover and book amazing events near you</p>
            </div>

            <!-- Loading State -->
            <div v-if="pending" class="flex flex-col items-center justify-center py-20">
                <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                <p class="text-gray-600 mt-4">Loading events...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
                <p class="text-red-600 font-semibold">Error loading events: {{ error }}</p>
            </div>

            <!-- Events Grid -->
            <div v-else-if="events?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <EventsEventCard 
                    v-for="event in events" 
                    :key="event.id" 
                    :event="event" 
                />
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-20">
                <p class="text-gray-500  text-lg">No events available at the moment</p>
            </div>
        
        </div>
    </div>
</template>

<script setup lang="ts">
const { getAllEvents } = useEvents()

const { data: events, error, pending } = await useAsyncData('events', async () => {
    const { data } = await getAllEvents()
    return data
})


useSeoMeta({    
    title: 'All Events - Bookify',
    description: 'Browse and book tickets for upcoming events, concerts, and conferences'
})
</script>