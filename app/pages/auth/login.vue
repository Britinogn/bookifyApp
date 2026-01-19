<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
      
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p class="mt-2 text-gray-600">Login to your account</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="you@example.com"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="••••••••"
          />
        </div>

        <!-- Error Message -->
        <div v-if="errorMsg" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-red-600 text-sm">{{ errorMsg }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full cursor-pointer py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          :disabled="loading"
        >
          <span v-if="!loading">Login</span>
          <span v-else class="flex items-center space-x-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"></path>
            </svg>
            <span>Logging in...</span>
          </span>
        </button>
      </form>

      <!-- Sign Up Link -->
      <p class="text-center text-gray-600">
        Don't have an account? 
        <NuxtLink to="/auth/signup" class="text-blue-600 hover:text-blue-700 font-medium">
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login } = useAuth()

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false) // new loading state

const handleLogin = async () => {
  errorMsg.value = ''
  loading.value = true

  const start = Date.now() // track start time
  const result = await login(email.value, password.value)
  const duration = Date.now() - start

  // ensure spinner shows at least 500ms
  const minDuration = 500
  if (duration < minDuration) {
    await new Promise(res => setTimeout(res, minDuration - duration))
  }

  loading.value = false

  if (!result.success) {
    errorMsg.value = result.error || 'Login failed'
  }
}

</script>
