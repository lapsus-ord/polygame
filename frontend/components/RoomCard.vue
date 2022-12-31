<template>
  <NuxtLink :to="`/rooms/${room.code}`">
    <div
      class="card card-compact bg-neutral text-neutral-content hover:shadow-xl animate-zoom"
    >
      <div class="card-body">
        <div class="card-title justify-between gap-0">
          <h2>{{ room.name }}</h2>
          <span
            class="font-light text-sm bg-neutral-content text-neutral rounded px-1"
          >
            {{ room.nbOfUsers }} joueurs
          </span>
        </div>
        <p class="font-light text-neutral-content/90">
          État&nbsp;: <span class="font-medium">{{ room.state }}</span>
        </p>
        <p class="font-light text-neutral-content/90">
          Jeu&nbsp;: <span class="font-medium">{{ room.gameDefinition }}</span>
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { RoomType } from '~/typings/room.type';

defineProps<{
  room: RoomType;
}>();
</script>

<style scoped>
.card-title > h2 {
  @apply truncate;
  width: 60%;
}
</style>
