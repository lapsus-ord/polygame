<template>
  <div>
    <div v-if="!isAuthenticated">
      <NuxtLink to="/auth/login">
        <div id="navbar-dropdown-button" tabindex="0">
          <h1 class="link">Login</h1>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="dropdown dropdown-end">
      <div id="navbar-dropdown-button" tabindex="0">
        <h1>René</h1>
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
        <li v-if="isAdmin">
          <NuxtLink to="/admin">Espace admin</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/" @click="handleLogout">Se déconnecter</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const isAuthenticated = ref(true);
const isAdmin = ref(false);

const handleLogout = () => {
  console.log('Logout action');
};
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
  @apply text-xl normal-case mx-3;
}

#navbar-dropdown-button > .avatar {
  @apply border-l-2 border-accent pl-1 mr-1;
}
</style>
