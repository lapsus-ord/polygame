<template>
  <form
    class="flex flex-col items-center gap-6 text-2xl"
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
      <p v-if="errorMessage" class="text-error text-sm">
        {{ errorMessage }}
      </p>
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
      <p v-if="errorMessage" class="text-error text-sm">
        {{ errorMessage }}
      </p>
    </div>
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
  console.log(`login: ${username.value}\n`);
  console.log(`password: ${password.value}`);

  const res = authStore.login(username.value, password.value);
  if (res) {
    navigateTo('/');
  } else {
    errorMessage.value = 'Wrong credentials';
  }
};
</script>
