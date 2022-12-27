<template>
  <div class="navbar">
    <div class="navbar-start p-4 flex gap-4">
      <NuxtLink to="/" class="btn gap-2 btn-ghost">
        <Icon name="logos:partytown-icon" size="2rem" />
        <h1 class="tracking-wider text-xl text-accent">Polygame</h1>
      </NuxtLink>
      <select v-model="$colorMode.preference" class="select w-full max-w-xs">
        <option disabled selected>Theme</option>
        <option v-for="theme of themes" :key="theme">{{ theme }}</option>
      </select>
    </div>

    <div class="navbar-end">
      <span>test</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const themes = ['system', 'light', 'dark', 'cupcake', 'halloween', 'dracula'];
</script>
