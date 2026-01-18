<template>
  <div>
    <!-- Hero Section -->
     <PagesHeroSection />

    <!-- How It Works -->
     <PagesHowItWorks />

    <!-- Features Section -->
    <PagesFeaturesSection />

    <!-- Featured Events Preview -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Featured Events
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Check out some of our most popular upcoming events
          </p>
        </div>

        <div v-if="pending" class="text-center py-10">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>

        <div v-else-if="events && events.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <EventsEventCard 
            v-for="event in featuredEvents" 
            :key="event.id" 
            :event="event" 
          />
        </div>

        <div class="text-center mt-12">
          <NuxtLink 
            to="/events"
            class="inline-block px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            View All Events →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <PagesCtaSection />
  </div>
</template>

<script setup lang="ts">
//import EventCard from '~/components/events/EventCard.vue'

const { getAllEvents } = useEvents()

// Fetch events for preview
const { data: events, pending } = await useAsyncData('featured-events', async () => {
  const { data } = await getAllEvents()
  return data
})

// Show only first 6 events as featured
const featuredEvents = computed(() => {
  return events.value?.slice(0, 6) || []
})
</script>

