<template>
  <div class="bg-white rounded-lg shadow-md p-6 border-l-4" :class="borderColor">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600 mb-1">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-800">{{ value }}</p>
        <p v-if="subtitle" class="text-sm text-gray-500 mt-2">{{ subtitle }}</p>
      </div>
      <div class="text-5xl">{{ icon }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  value: number | string
  subtitle?: string
  icon: string
  color?: 'blue' | 'green' | 'yellow' | 'purple'
}>()

const borderColor = computed(() => {
  const colors = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    yellow: 'border-yellow-500',
    purple: 'border-purple-500'
  }
  return colors[props.color || 'blue']
})
</script>