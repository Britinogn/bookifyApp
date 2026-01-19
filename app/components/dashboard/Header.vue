<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="flex items-center justify-between px-8 py-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">{{ pageTitle }}</h1>
        <p class="text-sm text-gray-600">{{ pageDescription }}</p>
      </div>

      <div class="flex items-center gap-4">
        <!-- Notifications -->
        <button class="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <span class="text-2xl">🔔</span>
          <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <!-- User Menu -->
        <div class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {{ userInitial }}
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-800">User</p>
            <p class="text-xs text-gray-600">Organizer</p>
          </div>
        </div>

        <!-- Logout Button -->
        <button
          @click="handleLogout"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const { logout } = useAuth()

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/dashboard': 'Overview',
    '/dashboard/events': 'My Events',
    '/dashboard/registrations': 'My Registrations',
    '/dashboard/settings': 'Settings'
  }
  return titles[route.path] || 'Dashboard'
})

const pageDescription = computed(() => {
  const descriptions: Record<string, string> = {
    '/dashboard': `Welcome back! ${Event.name} Here\'s what\'s happening with your events.`,
    '/dashboard/events': 'Manage all your created events',
    '/dashboard/registrations': 'Events you\'re registered for',
    '/dashboard/settings': 'Manage your account settings'
  }
  return descriptions[route.path] || ''
})

const userInitial = computed(() => 'U')

function handleLogout() {
  logout()
}
</script>