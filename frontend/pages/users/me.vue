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
    <button
      type="button"
      class="btn btn-outline btn-error self-start"
      @click="handleDelete"
    >
      Supprimer le compte
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const authStore = useAuthStore();
const userStore = useUserStore();

const handleDelete = () => {
  userStore.deleteUser(userStore.user?.id ?? 0).then((result) => {
    if (!result) return;
    authStore.reset();
    navigateTo('/');
  });
};
</script>
