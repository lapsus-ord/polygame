// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Polygame',
    },
  },
  modules: [
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],
  runtimeConfig: {
    public: {
      api_base: '',
    },
  },
  colorMode: {
    preference: 'system',
    dataValue: 'theme',
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
});
