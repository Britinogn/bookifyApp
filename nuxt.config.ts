// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

const API_BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:8080'
//const API_BASE_URL = import.meta.env.API_BASE_URL || 'https://rest-api-go-bnnn.onrender.com'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: true,
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],

    server: {
      watch: {
        usePolling: true
      }
    }
    
  },
  modules: [
    '@pinia/nuxt'
  ],

  runtimeConfig: {
    public: {
      apiBase: API_BASE_URL 
    }
  },

  //app details
  app: {
    head: {
      title: 'Bookify Application',
      //title: 'Event Booking App',

      meta: [
        {charset: 'utf-8'},
        { 
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ]
    }
  }
})
