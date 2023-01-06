<template>
  <NuxtLink :to="`/rooms/${room.code}`">
    <div
      class="card card-compact animate-zoom"
      :style="`border: solid 2px ${getGameColor};`"
    >
      <div class="card-body">
        <div class="card-title">
          <h2>{{ room.name }}</h2>
          <span class="user-count">{{ userCountPlurals }}</span>
        </div>

        <p>
          État&nbsp;:
          <span class="font-medium">
            {{ roomStore.getRoomState(room.state) }}
          </span>
        </p>
        <p>
          Jeu&nbsp;:
          <span class="font-medium"> {{ getGameName }} </span>
        </p>
      </div>

      <aside
        v-if="roomStore.userOwnsTheRoom(room.code)"
        class="absolute bottom-4 right-4 flex items-center"
      >
        <button class="delete-btn" type="button" @click.prevent="handleDelete">
          <Icon name="noto:wastebasket" size="25px" />
        </button>
      </aside>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { RoomWithUserCountType } from '~/typings/room.type';

const props = defineProps<{
  room: RoomWithUserCountType;
}>();

const roomStore = useRoomStore();
const gameStore = useGameStore();

const getGameColor = computed(() => {
  const definition = gameStore.getDefinition(props.room.gameDefinition);
  if (null === definition) return '#fff';

  return definition.color;
});

const getGameName = computed(() => {
  const definition = gameStore.getDefinition(props.room.gameDefinition);
  if (null === definition) return props.room.gameDefinition;

  return definition.name;
});

const userCountPlurals = computed(() =>
  props.room.userCount > 1
    ? `${props.room.userCount} joueurs`
    : `${props.room.userCount} joueur`
);

const handleDelete = () => {
  roomStore.deleteRoom(props.room.code).then((result) => {
    if (result) roomStore.refreshRooms();
  });
};
</script>

<style scoped>
.card {
  @apply bg-neutral text-neutral-content hover:shadow-xl;
}

.card-body p {
  @apply font-light text-neutral-content/90;
}

.card-title {
  @apply justify-between gap-0;
}

.card-title > h2 {
  @apply truncate;
  width: 60%;
}

.user-count {
  @apply tracking-wider text-sm bg-neutral-content text-neutral rounded px-1;
}

.delete-btn {
  padding: 0.2rem;
  @apply rounded bg-red-700 hover:bg-red-600 focus:bg-red-400 hover:scale-125 hover:shadow transition-all;
}
</style>
