<template>
  <form
    class="flex flex-col items-center gap-4 text-2xl"
    @submit.prevent="handleLogin"
  >
    <div class="form-control w-full max-w-xs">
      <label class="label" for="login-input">Pseudo</label>
      <input
        id="login-input"
        v-model="username"
        type="text"
        placeholder="Exemple : john.doe"
        autocomplete="username"
        :class="`input input-bordered ${errorMessage ? 'input-error' : ''}`"
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label" for="password-input">Mot de passe</label>
      <input
        id="password-input"
        v-model="password"
        type="password"
        placeholder="********"
        autocomplete="current-password"
        :class="`input input-bordered ${errorMessage ? 'input-error' : ''}`"
      />
    </div>
    <p v-if="errorMessage" class="text-error text-lg font-bold">
      <Icon name="twemoji:warning" size="1.5rem" class="mr-2" />
      <span>{{ errorMessage }}</span>
    </p>
    <button type="submit" class="btn btn-primary">
      <Icon name="carbon:send-alt-filled" size="1.5rem" />
      <span class="text-lg">&nbsp;Se connecter</span>
    </button>
  </form>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = () => {
  authStore.login(username.value, password.value).then((result) => {
    if (result.hasSucceeded) {
      navigateTo('/');
    } else {
      console.log(result.data.message);
      errorMessage.value = 'Mauvais identifiants';
    }
  });
};
</script>
