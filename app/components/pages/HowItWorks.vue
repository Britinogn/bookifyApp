<template>
  <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Get started in three simple steps and never miss an event again
        </p>
      </div>

      <!-- Steps -->
      <div class="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <!-- Step 1 -->
        <div class="relative">
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center h-full">
            <div class="w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
              1
            </div>
            <div class="text-6xl mb-6">🔍</div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Browse Events</h3>
            <p class="text-gray-600 leading-relaxed">
              Explore hundreds of exciting events happening near you. Filter by category, date, or location to find exactly what you're looking for.
            </p>
          </div>
          <!-- Arrow for desktop -->
          <div class="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-blue-500 text-4xl">
            →
          </div>
        </div>

        <!-- Step 2 -->
        <div class="relative">
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center h-full">
            <div class="w-20 h-20 bg-linear-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
              2
            </div>
            <div class="text-6xl mb-6">✍️</div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Register Instantly</h3>
            <p class="text-gray-600 leading-relaxed">
              Sign up for free and book your spot with just one click. Manage all your event registrations in one place.
            </p>
          </div>
          <!-- Arrow for desktop -->
          <div class="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-purple-500 text-4xl">
            →
          </div>
        </div>

        <!-- Step 3 -->
        <div class="relative">
          <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center h-full">
            <div class="w-20 h-20 bg-linear-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-lg">
              3
            </div>
            <div class="text-6xl mb-6">🎊</div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">Enjoy the Event</h3>
            <p class="text-gray-600 leading-relaxed">
              Show up and have an amazing time! Get reminders and updates about your registered events directly in your dashboard.
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16">
        <NuxtLink 
          to="/auth/signup"
          class="inline-block px-10 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          Get Started Now - It's Free! 🚀
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No logic needed for this component
</script>