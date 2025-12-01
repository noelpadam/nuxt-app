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
    preset: 'netlify',
  },
  nuxtElysia: {
    // Optional: Mount the Elysia server on /api instead of the default /_api
    path: '/api' 
  },
 
})