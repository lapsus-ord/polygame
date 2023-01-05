<template>
  <ul class="tabs tabs-boxed mb-6 justify-center p-4">
    <li
      :class="`tab ${tabPicked === 'users' ? 'tab-active' : ''}`"
      @click="$emit('update:tabPicked', 'users')"
    >
      <span>Utilisateurs</span>
    </li>
    <li
      class="tab"
      :class="`tab ${tabPicked === 'rooms' ? 'tab-active' : ''}`"
      @click="$emit('update:tabPicked', 'rooms')"
    >
      <span>Salons</span>
    </li>
    <li
      class="tab"
      :class="`tab ${tabPicked === 'games' ? 'tab-active' : ''}`"
      @click="$emit('update:tabPicked', 'games')"
    >
      <span>Jeux</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  tabPicked: string;
}>();
defineEmits<{
  (event: 'update:tabPicked', id: string): void;
}>();
</script>

<style scoped>
.tabs .tab {
  @apply text-lg w-32;
}
</style>
