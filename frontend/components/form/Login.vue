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
        :class="`input input-bordered ${errors.length ? 'input-error' : ''}`"
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
        :class="`input input-bordered ${errors.length ? 'input-error' : ''}`"
      />
    </div>

    <p v-for="error in errors" :key="error" class="whitespace-wrap text-center">
      <Icon name="twemoji:warning" size="1.5rem" class="mr-2" />
      <span class="text-error text-lg font-bold">{{ error }}</span>
    </p>

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
const errors = ref([] as string[]);

const handleLogin = () => {
  authStore.login(username.value, password.value).then((result) => {
    if (result.hasSucceeded) {
      navigateTo('/');
    } else {
      errors.value = result.data.messages;
    }
  });
};
</script>
