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
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-icon',
  ],
  imports: {
    dirs: ['./stores'],
  },
  runtimeConfig: {
    public: {
      api_base: '',
    },
  },
  typescript: {
    typeCheck: true,
    strict: true,
  },
});
