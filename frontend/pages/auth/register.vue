<template>
  <Title>Inscription</Title>

  <div class="h-full flex items-center justify-center gap-32">
    <aside class="hidden sm:block">
      <span><Icon name="noto:circus-tent" size="150px" /></span>
    </aside>
    <div>
      <h1 class="text-4xl mb-4">Inscription</h1>
      <RegisterForm />
      <NuxtLink to="/auth/login" class="link">
        <p class="text-lg mt-4">Déjà un compte&nbsp;? Se connecter&nbsp;!</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>
