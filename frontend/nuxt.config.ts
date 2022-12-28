// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      titleTemplate: (title: string | undefined) => {
        return title ? `${title} - Polygame` : 'Polygame';
      },
      link: [{ rel: 'icon', href: '/img/favicon.ico', type: 'image/x-icon' }],
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
