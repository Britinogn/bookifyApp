<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl  font-bold mb-8">All Events</h1>

        <div v-if="pending" class="text-center animate-spin">Loading events...</div>

        <div v-else-if="error" class="text-red-500">
            Error loading events: {{ error }}
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EventsEventCard 
            v-for="event in events" 
            :key="event.id" 
            :event="event" 
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const { getAllEvents } = useEvents()

const { data: events, error, pending } = await useAsyncData('events', async () => {
    const { data } = await getAllEvents()
    return data
})



// const {data: events, error , pending} = await useAsyncData('event', async () => {
//   const {data} = await getEventById()
//   return data
// })
</script>