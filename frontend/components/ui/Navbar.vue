<template>
  <div class="navbar">
    <div class="navbar-start p-4 flex gap-4">
      <NuxtLink to="/" class="btn btn-ghost gap-2">
        <Icon name="logos:partytown-icon" size="2rem" />
        <h1 class="tracking-wider text-accent">{{ projectName }}</h1>
      </NuxtLink>
      <select
        v-model="$colorMode.preference"
        class="select w-full max-w-xs hidden md:block"
      >
        <option disabled selected>Theme</option>
        <option v-for="theme of themes" :key="theme">{{ theme }}</option>
      </select>
    </div>

    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" alt="profile image" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><NuxtLink to="/users/me">Profil</NuxtLink></li>
          <li><NuxtLink to="/">Se déconnecter</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  projectName: {
    type: String,
    required: true,
  },
});

const themes = ['system', 'light', 'dark', 'cupcake', 'halloween', 'dracula'];
</script>
