<template>
  <div class="h-full flex items-center justify-center">
    <div v-if="null === room || undefined === room" class="animate-spin">
      <Icon name="quill:loading-spin" size="5rem" />
    </div>

    <div v-else-if="typeof room === 'boolean'" class="text-center">
      <h2 class="text-4xl font-bold mb-8">Le salon n'existe pas&#8230;</h2>
      <NuxtLink to="/" class="btn btn-lg btn-accent">Accueil</NuxtLink>
    </div>

    <div v-else class="w-full h-full flex flex-nowrap">
      <GameBoard v-model:room="room" class="md:basis-3/4" />
      <GameToolbar :room="room" class="md:basis-1/4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoomWithUsersType } from '~/typings/room.type';
import { Ref } from 'vue';

const { code } = useRoute().params;
const roomStore = useRoomStore();
const gameStore = useGameStore();
definePageMeta({
  layout: 'game',
});

const room: Ref<RoomWithUsersType | boolean | null> = ref(null);
await gameStore.findAllDefinitions();
room.value = await roomStore.findByCode(code as string);

useHead({
  title: () => {
    if (null === room.value) return `Salon ${code}`;
    if (typeof room.value === 'boolean') return `Salon inconnu`;
    return room.value.name;
  },
});
</script>
