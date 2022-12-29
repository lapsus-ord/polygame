<template>
  <div class="h-full flex items-center justify-center gap-32">
    <aside class="hidden sm:block">
      <span><Icon name="noto:elephant" size="150px" /></span>
    </aside>
    <div>
      <h1 class="text-4xl mb-4">Connexion</h1>
      <LoginForm />
      <NuxtLink to="/auth/register" class="link">
        <p class="text-lg mt-4">Pas de compte&nbsp;? Inscrivez-vous&nbsp;!</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  title: 'Connexion',
});
</script>
