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
          État&nbsp;:
          <span class="font-medium">
            {{ roomStore.getRoomState(room.state) }}
          </span>
        </p>
        <p class="font-light text-neutral-content/90">
          Jeu&nbsp;:
          <span class="font-medium">
            {{ gameStore.getDefinitionName(props.room.gameDefinition) }}
          </span>
        </p>
      </div>

      <aside class="absolute bottom-4 right-4 flex items-center">
        <button class="delete-btn" type="button" @click.prevent="handleDelete">
          <Icon name="noto:wastebasket" size="30px" />
        </button>
      </aside>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { RoomType } from '~/typings/room.type';

const props = defineProps<{
  room: RoomType;
}>();

const roomStore = useRoomStore();
const gameStore = useGameStore();

const handleDelete = () => {
  roomStore.deleteRoom(props.room.code);
};
</script>

<style scoped>
.card-title > h2 {
  @apply truncate;
  width: 60%;
}

.delete-btn {
  padding: 0.25rem;
  @apply rounded bg-red-800 hover:bg-red-600 focus:bg-red-400 hover:scale-125 hover:shadow transition-all;
}
</style>
