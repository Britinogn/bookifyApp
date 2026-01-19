<template>
  <aside class="w-64 bg-white shadow-lg min-h-screen">
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-8">Dashboard</h2>

      <nav class="space-y-2">
        <NuxtLink
          to="/dashboard"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          :class="isActive('/dashboard') ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'"
        >
          <span class="text-xl">📊</span>
          <span>Overview</span>
        </NuxtLink>

        <NuxtLink
          to="/dashboard/events"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          :class="isActive('/dashboard/events') ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'"
        >
          <span class="text-xl">🎯</span>
          <span>My Events</span>
        </NuxtLink>

        <NuxtLink
          to="/dashboard/registrations"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          :class="isActive('/dashboard/registrations') ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'"
        >
          <span class="text-xl">✅</span>
          <span>Registrations</span>
        </NuxtLink>

        <NuxtLink
          to="/dashboard/settings"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          :class="isActive('/dashboard/settings') ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'"
        >
          <span class="text-xl">⚙️</span>
          <span>Settings</span>
        </NuxtLink>
      </nav>

      <div class="mt-8 pt-8 border-t border-gray-200">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
        >
          <span class="text-xl">🏠</span>
          <span>Back to Home</span>
        </NuxtLink>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

function isActive(path: string) {
  return route.path === path
}
</script>