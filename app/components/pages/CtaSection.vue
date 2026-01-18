<template>
  <section class="relative py-20 bg-blue-600 text-white overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px;"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p class="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of event enthusiasts and never miss out on amazing experiences again.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink 
            v-if="!isAuthenticated"
            to="/auth/signup" 
            class="px-10 py-5 bg-white text-blue-700 font-bold text-lg rounded-full hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/50 transform hover:scale-105 w-full sm:w-auto"
          >
            Create Free Account
          </NuxtLink>

          <NuxtLink 
            v-if="!isAuthenticated"
            to="/auth/login" 
            class="px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-blue-700 transition-all duration-300 w-full sm:w-auto"
          >
            Sign In
          </NuxtLink>

          <NuxtLink 
            v-if="isAuthenticated"
            to="/events/create" 
            class="px-10 py-5 bg-yellow-400 text-gray-900 font-bold text-lg rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 w-full sm:w-auto"
          >
            Create Your Event
          </NuxtLink>
        </div>

        <!-- Trust Badges -->
        <div class="mt-16 flex flex-wrap justify-center items-center gap-8 text-blue-200">
          <div class="flex items-center gap-2">
            <span class="text-2xl">✓</span>
            <span>No Credit Card Required</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">✓</span>
            <span>Free Forever</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">✓</span>
            <span>Cancel Anytime</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { isAuthenticated } = useAuth()
</script>