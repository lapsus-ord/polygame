<template>
  <div class="definition-card">
    <input
      type="radio"
      name="definition"
      :value="definition.name"
      class="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer z-10"
    />
    <div class="definition-body">
      <Icon class="icon" :name="definition.logo" size="60px" />
      <h2 class="name">{{ definition.name }}</h2>
      <p class="description">
        {{ definition.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GameDefinitionType } from '~/typings/game.type';

defineProps<{
  definition: GameDefinitionType;
}>();
</script>

<style scoped>
.definition-card {
  min-width: 175px;
  max-width: 175px;
  @apply relative;
}

.definition-body {
  background-color: #eee;
  color: #555;
  transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
  @apply flex flex-col items-center justify-center
    w-full h-full px-2 pb-2 rounded-lg;
}

input[type='radio']:hover + .definition-body {
  background-color: #ddd;
}

input[type='radio']:checked + .definition-body {
  color: #000;
  @apply bg-primary;
}

.definition-card .icon {
  filter: drop-shadow(3px 3px 2px rgb(0 0 0 / 0.4));
  @apply my-2 flex justify-center;
}

.definition-card .name {
  overflow-x: clip;
  text-overflow: ellipsis;
  white-space: nowrap;
  @apply text-center w-full text-2xl font-bold tracking-wide;
}

.definition-card .description {
  @apply w-full text-center text-sm overflow-clip tracking-wide;
}
</style>
