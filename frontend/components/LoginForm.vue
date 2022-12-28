<template>
  <form
    class="flex flex-col items-center gap-6 text-2xl"
    @submit.prevent="handleLogin"
  >
    <div class="form-control w-full max-w-xs">
      <label class="label" for="login-input">Pseudo</label>
      <input
        id="login-input"
        v-model="login"
        type="text"
        placeholder="Exemple : john.doe"
        autocomplete="username"
        class="input input-bordered"
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
        class="input input-bordered"
      />
    </div>
    <button type="submit" class="btn btn-primary mt-2">
      <Icon name="carbon:send-alt-filled" size="1.5rem" />
      <span class="text-lg">&nbsp;Se connecter</span>
    </button>
  </form>
</template>

<script setup lang="ts">
const login = ref('');
const password = ref('');

const handleLogin = () => {
  console.log(`login: ${login.value}\n`);
  console.log(`password: ${password.value}`);
};
</script>
