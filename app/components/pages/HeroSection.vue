<template>
  <section class="relative bg-blue-600 text-white overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
    </div>

    <div class="container mx-auto px-4 py-20 lg:py-32 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Main Heading -->
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          Discover & Book
          <span class="block text-yellow-300">Amazing Events</span>
        </h1>

        <!-- Subheading -->
        <p class="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Find the perfect events near you, register instantly, and never miss out on incredible experiences.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink 
            to="/events" 
            class="px-8 py-4 bg-yellow-400 text-gray-900 font-bold text-lg rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-2xl transform hover:scale-105 w-full sm:w-auto"
          >
            Browse Events 🎉
          </NuxtLink>

          <NuxtLink 
            v-if="!isAuthenticated"
            to="/auth/signup" 
            class="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto"
          >
            Sign Up Free
          </NuxtLink>

          <NuxtLink 
            v-if="isAuthenticated"
            to="/dashboard" 
            class="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 w-full sm:w-auto"
          >
            Go to Dashboard
          </NuxtLink>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">500+</div>
            <div class="text-blue-200 text-sm md:text-base">Active Events</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">10K+</div>
            <div class="text-blue-200 text-sm md:text-base">Happy Users</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">50+</div>
            <div class="text-blue-200 text-sm md:text-base">Cities</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave Bottom -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const { isAuthenticated } = useAuth()
</script>