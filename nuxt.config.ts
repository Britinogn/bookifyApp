import tailwindcss from "@tailwindcss/vite";
import { headConfig, seoConfig } from './app/config/seo.config'

//const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://rest-api-go-bnnn.onrender.com'
const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8080'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: true,
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        usePolling: true
      }
    }
  },
  modules: ['@pinia/nuxt'],
  
  runtimeConfig: {
    public: {
      apiBase: API_BASE_URL 
    }
  },

  app: {
    head: {
      title: seoConfig.title,
      ...headConfig
    }
  },
})