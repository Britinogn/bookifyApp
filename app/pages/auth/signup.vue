<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <h2 class="text-3xl font-bold text-center">Sign Up</h2>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label class="block text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</div>
        <div v-if="successMsg" class="text-green-500 text-sm">{{ successMsg }}</div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>

      <p class="text-center">
        Already have an account? 
        <NuxtLink to="/login" class="text-blue-600">Login</NuxtLink>
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
    setTimeout(() => router.push('/login'), 2000)
  } else {
    errorMsg.value = result.error || 'Signup failed'
  }
}
</script>