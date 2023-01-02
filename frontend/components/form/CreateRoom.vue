<template>
  <form method="post" @submit.prevent="handleCreateRoom">
    <h1 class="mb-4 text-primary">{{ title }}</h1>

    <div class="list-game-selection">
      <GameDefinitionCard
        v-for="(definition, index) in gameStore.definitions"
        :key="definition.slug"
        v-model:game-selected="gameSelected"
        :definition="definition"
        :is-checked="index === 0"
      />
    </div>

    <div class="line">
      <input
        v-model="name"
        type="text"
        placeholder="Nom du salon"
        class="input input-bordered text-lg font-semibold tracking-wider w-full sm:grow sm:w-0 sm:min-w-0 sm:max-w-xs"
        minlength="3"
        maxlength="20"
        spellcheck="false"
        autocomplete="off"
        required
      />
      <RockerSwitch
        v-model:is-checked-event="isPublic"
        :is-checked="true"
        left-switch="Public"
        right-switch="Privé"
      />
      <button type="submit" class="btn btn-primary w-full sm:px-10 sm:w-fit">
        {{ buttonTitle }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  buttonTitle: string;
}>();

const userStore = useUserStore();
const roomStore = useRoomStore();
const gameStore = useGameStore();

const gameSelected = ref(gameStore.defaultDefinition?.slug ?? null);
const name = ref(`Chez ${userStore.user?.username ?? 'Guest'}`);
const isPublic = ref(true);

const handleCreateRoom = () => {
  if (null === gameSelected.value) return;

  roomStore.create(name.value, gameSelected.value, isPublic.value);
};
</script>

<style scoped>
.list-game-selection {
  @apply flex gap-3 mb-2 pb-1 overflow-x-scroll overflow-y-hidden;
}

.line {
  @apply flex flex-col gap-2 sm:flex-row items-start sm:items-center overflow-clip;
}
</style>
