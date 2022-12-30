<template>
  <Title>Mon profil</Title>

  <div class="flex flex-col gap-8 max-w-xl mx-auto pl-6 pt-8">
    <h1 class="text-4xl">Mon profil</h1>

    <p class="text-3xl">Pseudo&nbsp;: {{ userStore.user?.username }}</p>
    <p class="text-3xl flex items-center gap-4">
      <span>Rôle&nbsp;:</span>
      <span
        :class="`badge badge-lg ${
          userStore.isAdmin ? 'badge-warning' : 'badge-info'
        }`"
      >
        {{ userStore.user?.role }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const userStore = useUserStore();
</script>
