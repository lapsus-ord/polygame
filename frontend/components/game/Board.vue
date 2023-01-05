<template>
  <div class="game-board">
    <nav class="self-stretch flex items-center justify-between">
      <h2 class="text-xl sm:text-4xl flex gap-4">
        <Icon :name="getDefLogo" />
        <span class="whitespace-nowrap">{{ room.name }}</span>
      </h2>
      <div v-if="userStore.isLogged && !isCreator">
        <button v-if="!isInRoom" class="btn btn-accent" @click="handleJoin">
          Rejoindre
        </button>
        <button v-else class="btn btn-accent" @click="handleLeave">
          Partir
        </button>
      </div>

      <div v-else-if="isCreator">
        <button class="delete-btn" @click="handleDelete">
          <Icon name="noto:wastebasket" size="25px" />
        </button>
      </div>
    </nav>

    <div class="grow bg-neutral/30 rounded-lg px-4 py-3"></div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue';
import { RoomWithUsersType } from '~/typings/room.type';
import { UserType } from '~/typings/user.type';
import { Icon } from '#components';

const userStore = useUserStore();
const roomStore = useRoomStore();
const gameStore = useGameStore();
const props = defineProps<{
  room: RoomWithUsersType;
}>();
const emits = defineEmits<{
  (event: 'update:room', id: RoomWithUsersType): void;
}>();

// Values
const room: Ref<RoomWithUsersType> = ref(props.room);

// Computed
const isInRoom = computed(() => {
  const loggedUser = userStore.user as UserType;
  return !!room.value.users.find((user) => user.id === loggedUser.id);
});

const isCreator = computed(() => {
  if (null === userStore.user) return false;
  const loggedUser = userStore.user;
  return room.value.creator.id === loggedUser.id;
});

const getDefLogo = computed(() => {
  return gameStore.getDefinition(props.room.gameDefinition)?.logo ?? '🕹';
});

// Functions
const handleJoin = () => {
  roomStore.join(room.value.code).then((result) => {
    if (!result) return;
    refreshRoom();
  });
};
const handleLeave = () => {
  roomStore.leave(room.value.code).then((result) => {
    if (!result) return;
    refreshRoom();
  });
};
const handleDelete = async () => {
  const result = await roomStore.deleteRoom(room.value.code);
  if (!result) return;
  navigateTo('/');
};

const refreshRoom = () => {
  roomStore.findByCode(room.value.code).then((result) => {
    if (typeof result === 'boolean') return;
    room.value = result;
    emits('update:room', result);
  });
};
</script>

<style scoped>
.game-board {
  @apply grow p-4 w-full h-full flex flex-col gap-4 bg-base-100;
}

.delete-btn {
  @apply p-2 rounded-md bg-red-700 hover:bg-red-600 focus:bg-red-400 hover:scale-125 hover:shadow transition-all;
}
</style>
