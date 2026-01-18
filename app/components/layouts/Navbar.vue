<template>
  <nav :class="['fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled ? 'bg-white shadow-lg backdrop-blur-sm bg-opacity-95' : 'bg-white shadow-md']">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2 group">
          <div class="relative">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <Calendar :size="24" class="text-white" />
            </div>
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
          </div>
          <span class="text-2xl font-bold text-blue-600">
            Bookify
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink to="/events" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 font-medium">
            Events
          </NuxtLink>
          <NuxtLink to="/" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 font-medium">
            Discover
          </NuxtLink>
          <button class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-2">
            <Search :size="16" />
            Search
          </button>
        </div>

        <!-- Desktop Auth Buttons -->
        <div class="hidden md:flex items-center space-x-3">
          <template v-if="isAuthenticated">
            <NuxtLink to="/dashboard" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium flex items-center gap-2">
              <User :size="16" />
              Profile
            </NuxtLink>
            <button 
              @click="handleLogout"
              class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium flex items-center gap-2"
            >
              <LogOut :size="16" />
              Logout
            </button>
          </template>
          
          <template v-else>
            <NuxtLink to="/auth/login" class="px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200 font-medium">
              Login
            </NuxtLink>
            <NuxtLink to="/auth/signup" class="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md">
              Sign Up
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <X v-if="isMenuOpen" :size="24" class="text-gray-700" />
          <Menu v-else :size="24" class="text-gray-700" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div :class="['md:hidden overflow-hidden transition-all duration-300',
        isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0']">
        <div class="flex flex-col space-y-2 pt-4 border-t border-gray-100">
          <NuxtLink to="/events" class="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 font-medium" @click="isMenuOpen = false">
            Events
          </NuxtLink>
          <NuxtLink to="/" class="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 font-medium" @click="isMenuOpen = false">
            Discover
          </NuxtLink>
          <button class="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-2">
            <Search :size="16" />
            Search
          </button>
          
          <div class="pt-4 border-t border-gray-100 space-y-2">
            <template v-if="isAuthenticated">
              <NuxtLink to="/dashboard" class="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium flex items-center gap-2" @click="isMenuOpen = false">
                <User :size="16" />
                Profile
              </NuxtLink>
              <button 
                @click="handleLogout"
                class="w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <LogOut :size="16" />
                Logout
              </button>
            </template>
            
            <template v-else>
              <NuxtLink to="/auth/login" class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors duration-200 font-medium text-center" @click="isMenuOpen = false">
                Login
              </NuxtLink>
              <NuxtLink to="/auth/signup" class="block px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-center shadow-md" @click="isMenuOpen = false">
                Sign Up
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Calendar, User, LogOut, Search } from 'lucide-vue-next'

const { isAuthenticated, logout } = useAuth()

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const handleLogout = () => {
  logout()
  isMenuOpen.value = false
}

onMounted(() => {
  // Prevent layout shift from scrollbar
  //document.documentElement.style.scrollbarGutter = 'stable'
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll) 
})
</script>