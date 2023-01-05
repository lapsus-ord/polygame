export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Polygame',
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
  piniaPersistedstate: {
    cookieOptions: {
      // httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
    },
    storage: 'cookies',
  },
});
