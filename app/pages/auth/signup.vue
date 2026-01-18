<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
      
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
        <p class="mt-2 text-gray-600">Sign up to get started</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSignup" class="space-y-6">
        
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

        <!-- Success Message -->
        <div v-if="successMsg" class="bg-green-50 border border-green-200 rounded-lg p-3">
          <p class="text-green-600 text-sm">{{ successMsg }}</p>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full cursor-pointer py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </form>

      <!-- Login Link -->
      <p class="text-center text-gray-600">
        Already have an account? 
        <NuxtLink to="/auth/login" class="text-blue-600 hover:text-blue-700 font-medium">
          Login
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signup } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const successMsg = ref('')

const handleSignup = async () => {
  errorMsg.value = ''
  successMsg.value = ''
  
  const result = await signup(email.value, password.value)
  
  if (result.success) {
    successMsg.value = 'Account created! Redirecting to login...'
    setTimeout(() => router.push('/auth/login'), 2000)
  } else {
    errorMsg.value = result.error || 'Signup failed'
  }
}
</script>