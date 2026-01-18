<template>
  <nav class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold">Bookify</NuxtLink>

      <div class="space-x-4">
        <NuxtLink to="/" class="hover:text-blue-200">Events</NuxtLink>
        
        <template v-if="isAuthenticated">
          <button @click="logout" class="hover:text-blue-200">Logout</button>
        </template>
        
        <template v-else>
          <NuxtLink to="/auth/login" class="hover:text-blue-200">Login</NuxtLink>
          <NuxtLink to="/auth/signup" class="hover:text-blue-200">Sign Up</NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { isAuthenticated, logout } = useAuth()
</script>