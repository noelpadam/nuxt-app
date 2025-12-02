// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Nuxt', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-elysia'],
  nitro: {
    externals: {
      external: ['bun:sqlite', 'bun:ffi', /* any other bun: modules */]
    },
   preset: 'netlify',
  },
  nuxtElysia: {
    // Optional: Mount the Elysia server on /api instead of the default /_api
    path: '/api' 
  },
  vite: {
    ssr: {
      // Explicitly mark bun:sqlite as external for the server-side build
      external: [
        'bun:sqlite' 
      ],
    },
  },
 
})