<template>
  <form
    class="flex flex-col items-center gap-4 text-2xl"
    @submit.prevent="handleLogin"
  >
    <div class="form-control">
      <label class="label" for="login-input">Pseudo</label>
      <input
        id="login-input"
        v-model="username"
        type="text"
        placeholder="Exemple : john.doe"
        autocomplete="username"
        required
        :class="`input input-bordered ${hasErrors ? 'input-error' : ''}`"
      />
    </div>
    <div class="form-control">
      <label class="label" for="password-input">Mot de passe</label>
      <input
        id="password-input"
        v-model="password"
        type="password"
        placeholder="********"
        autocomplete="current-password"
        required
        :class="`input input-bordered ${hasErrors ? 'input-error' : ''}`"
      />
    </div>

    <button type="submit" class="btn btn-primary mt-1">
      <Icon name="carbon:send-alt-filled" size="1.5rem" />
      <span class="text-lg">&nbsp;Se connecter</span>
    </button>
  </form>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const hasErrors = ref(false);

const handleLogin = () => {
  authStore.login(username.value, password.value).then((result) => {
    if (result) navigateTo('/');
    else hasErrors.value = true;
  });
};
</script>
