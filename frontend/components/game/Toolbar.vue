<template>
  <aside class="game-toolbar">
    <div class="h-1/3">
      <nav class="h-1/6 tabs flex-nowrap rounded-bl-md">
        <button
          :class="`tab tab-lifted ${tab === tabs.users ? 'tab-active' : ''}`"
          @click="tab = tabs.users"
        >
          Utilisateurs
        </button>
        <button
          :class="`tab tab-lifted ${tab === tabs.config ? 'tab-active' : ''}`"
          @click="tab = tabs.config"
        >
          Configuration
        </button>
      </nav>

      <div class="h-5/6 border-x-2 border-primary border-dashed p-2">
        <ul v-if="tab === tabs.users" class="h-full overflow-y-scroll">
          <li
            v-for="user in room.users"
            :key="user.id"
            class="flex gap-2 px-4 py-1 mb-2 hover:bg-white/20 transition-colors rounded-md"
          >
            <span class="text-xl">{{ user.username }}</span>
            <span v-if="isCreator(user.id)"><Icon name="noto-v1:crown" /></span>
          </li>
        </ul>

        <p v-if="tab === tabs.config"></p>
      </div>
    </div>

    <div class="h-2/3 flex flex-col">
      <h1 class="bg-secondary p-2 rounded-l-lg">Chatroom</h1>
      <div class="grow border-x-2 border-secondary border-dashed p-2">
        <ChatRoom />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RoomWithUsersType } from '~/typings/room.type';

const props = defineProps<{
  room: RoomWithUsersType;
}>();

const isCreator = computed(() => (userId: number) => {
  return props.room.creator.id === userId;
});

const tabs = {
  users: 'users',
  config: 'config',
};

const tab = ref(tabs.users);
</script>

<style scoped>
.tabs > .tab {
  @apply h-full text-xl font-semibold basis-1/2;
}
.tabs > .tab-active {
  @apply bg-primary;
}
.tabs > :not(.tab-active) {
  @apply border-b-2 border-primary border-dashed;
}
</style>

<style scoped>
.game-toolbar {
  @apply hidden md:block h-full pt-4;
}
</style>
