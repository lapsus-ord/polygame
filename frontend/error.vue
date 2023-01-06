<template>
  <div class="h-full flex flex-col items-stretch">
    <header class="bg-neutral shadow-md">
      <Navbar />
    </header>

    <NuxtLayout>
      <div class="h-full flex items-center justify-center gap-32">
        <div class="hidden sm:block animate-spin origin-bottom-right">
          <Icon name="🦧" size="7rem" />
        </div>
        <div
          v-if="error?.statusCode === 404"
          class="flex flex-col gap-8 items-start"
        >
          <h1 class="text-4xl">Erreur {{ error.statusCode }}</h1>
          <p class="text-2xl font-bold">La page n'existe pas</p>
          <button class="btn btn-lg btn-accent" @click="handleError">
            Accueil
          </button>
        </div>
        <div v-else class="flex flex-col gap-8 items-start">
          <h1 class="text-4xl">Erreur {{ error?.statusCode ?? 500 }}</h1>
          <p class="text-2xl font-bold">{{ error?.message ?? '' }}</p>
          <button class="btn btn-lg btn-accent" @click="handleError">
            Accueil
          </button>
        </div>
      </div>
    </NuxtLayout>

    <Toasts />

    <footer class="footer footer-center py-2 bg-neutral z-10">
      <div class="items-center grid-flow-col text-neutral-content">
        <Icon name="logos:partytown-icon" size="20px" />
        <p>
          Made with <Icon name="mdi:cards-heart" /> by
          <a class="link" href="https://github.com/lapsus-ord" target="_blank">
            Lapsus
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object,
});

const handleError = () => clearError({ redirect: '/' });
</script>

<style scoped>
.animate-spin {
  transform-origin: 70px 50px;
}
</style>
