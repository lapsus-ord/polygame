import { resolve } from 'node:path';

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
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],
  alias: {
    typings: resolve(__dirname, './typings'),
  },
  imports: {
    dirs: ['./stores'],
  },
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
