<template>
  <div>
    <div v-if="userStore.isLogged" class="dropdown dropdown-end">
      <div id="navbar-dropdown-button" tabindex="0">
        <h1>{{ userStore.user?.username ?? '' }}</h1>
        <div class="avatar">
          <Icon name="ic:baseline-account-circle" class="w-10 h-auto" />
        </div>
      </div>

      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content border-4 border-accent-focus border-dashed mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <NuxtLink to="/users/me">Profil</NuxtLink>
        </li>
        <li v-if="userStore.isAdmin">
          <NuxtLink to="/admin">Espace admin</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" @click="authStore.logout">Se déconnecter</NuxtLink>
        </li>
      </ul>
    </div>

    <div v-else>
      <NuxtLink to="/auth/login">
        <div id="navbar-dropdown-button" tabindex="0">
          <h1>Se connecter</h1>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const userStore = useUserStore();
</script>

<style scoped>
#navbar-dropdown-button {
  @apply rounded-full btn p-0 text-white;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border: 2px dashed hsl(var(--a));
  cursor: pointer;
}

#navbar-dropdown-button:hover {
  border: 2px dashed hsl(var(--af));
}

#navbar-dropdown-button > h1 {
  @apply text-lg mx-3 overflow-x-hidden whitespace-nowrap cursor-pointer;
}

#navbar-dropdown-button > .avatar {
  @apply border-l-2 border-accent pl-1 mr-1;
}
</style>
