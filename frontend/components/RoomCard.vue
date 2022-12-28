<template>
  <div class="card w-60 bg-neutral text-neutral-content shadow-lg animate-zoom">
    <div class="card-body p-3">
      <h2 class="card-title">{{ room.name }}</h2>
      <p>
        État&nbsp;: <span class="font-bold">{{ room.state }}</span>
      </p>
      <p>
        Jeu&nbsp;: <span class="font-bold">{{ room.gameDefinition }}</span>
      </p>
      <p>{{ room.nbOfUsers }} joueurs</p>
      <div class="card-actions justify-end">
        <NuxtLink to="/rooms/1234" class="btn btn-primary">Voir</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  room: {
    code: string;
    name: string;
    state: string;
    // creator: { id: number; username: string };
    gameDefinition: string;
    nbOfUsers: number;
    // createdAt: Date;
    // updatedAt: Date;
  };
}>();
</script>
