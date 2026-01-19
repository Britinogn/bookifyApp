<!-- <template>

</template>

<script setup>
definePageMeta({
    layout: 'dashboard',
    middleware: 'auth'
})
</script> -->

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Dashboard Header -->
    <DashboardHeader />

    <div class="flex">
      <!-- Sidebar -->
      <DashboardSidebar />

      <!-- Main Content Area -->
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// Protect all dashboard routes
definePageMeta({
  middleware: 'auth'
})
</script>
