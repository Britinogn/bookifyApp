<template>
  <div>
    <!-- Welcome Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Welcome back! 👋</h1>
      <p class="text-gray-600 mt-2">Here's what's happening with your events</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardStatCard
        title="Total Events"
        :value="stats.totalEvents"
        subtitle="Events created"
        icon="🎯"
        color="blue"
      />

      <DashboardStatCard
        title="Registrations"
        :value="stats.totalRegistrations"
        subtitle="People registered"
        icon="✅"
        color="green"
      />

      <DashboardStatCard
        title="Upcoming"
        :value="stats.upcomingEvents"
        subtitle="Events this month"
        icon="📅"
        color="yellow"
      />

      <DashboardStatCard
        title="Past Events"
        :value="stats.pastEvents"
        subtitle="Completed"
        icon="📊"
        color="purple"
      />
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <NuxtLink
          to="/dashboard/events"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <span class="text-3xl">🎯</span>
          <div>
            <p class="font-semibold text-gray-800">Manage Events</p>
            <p class="text-sm text-gray-600">View and edit your events</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/dashboard/registrations"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <span class="text-3xl">✅</span>
          <div>
            <p class="font-semibold text-gray-800">Registrations</p>
            <p class="text-sm text-gray-600">View event sign-ups</p>
          </div>
        </NuxtLink>

        <NuxtLink
          to="/events"
          class="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <span class="text-3xl">🔍</span>
          <div>
            <p class="font-semibold text-gray-800">Browse Events</p>
            <p class="text-sm text-gray-600">Discover new events</p>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Recent Events -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Recent Events</h2>
      <div v-if="recentEvents && recentEvents.length > 0" class="space-y-3">
        <div
          v-for="event in recentEvents"
          :key="event.id"
          class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <div>
            <p class="font-semibold text-gray-800">{{ event.name }}</p>
            <p class="text-sm text-gray-600">{{ event.location }} • {{ formatDate(event.date_time) }}</p>
          </div>
          <NuxtLink
            :to="`/events/${event.id}`"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            View
          </NuxtLink>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        No events yet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const { getAllEvents } = useEvents()

// Fetch events for stats
const { data: events } = await useAsyncData('dashboard-stats', async () => {
  const { data } = await getAllEvents()
  return data
})

// Calculate stats
const stats = computed(() => {
  const total = events.value?.length || 0
  const now = new Date()
  
  const upcoming = events.value?.filter(e => new Date(e.date_time) > now).length || 0
  const past = events.value?.filter(e => new Date(e.date_time) <= now).length || 0

  return {
    totalEvents: total,
    totalRegistrations: 0, // TODO: Get from API
    upcomingEvents: upcoming,
    pastEvents: past
  }
})

// Recent events (last 5)
const recentEvents = computed(() => {
  return events.value?.slice(0, 5) || []
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>