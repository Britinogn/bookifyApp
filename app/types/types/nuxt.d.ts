// types/runtimeConfig.d.ts  (or wherever you put your custom types)
declare module '#app' {
  interface RuntimeConfigPublic {
    apiBase: string
  }
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    apiBase: string
  }
}

export {} // makes it a module