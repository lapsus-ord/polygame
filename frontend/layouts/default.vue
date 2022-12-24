<template>
  <div>
    <div class="p-4 flex gap-4">
      <button class="btn">
        <Icon name="" />
        <h1>Polygame</h1>
      </button>
      <select v-model="$colorMode.preference" class="select w-full max-w-xs">
        <option disabled selected>Theme</option>
        <option v-for="theme of themes" :key="theme">{{ theme }}</option>
      </select>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
const themes = ['system', 'light', 'dark', 'cupcake', 'halloween', 'dracula'];
</script>
