<template>
  <form @submit.prevent="handleCreateRoom">
    <h1 class="mb-4 text-primary">{{ title }}</h1>

    <div class="list-game-selection">
      <GameDefinitionCard
        v-for="(definition, index) in gameStore.definitions"
        :key="definition.slug"
        :definition="definition"
        :is-checked="index === 0"
      />
    </div>

    <div class="flex items-center overflow-clip">
      <input
        type="text"
        placeholder="Nom du salon"
        class="input input-bordered text-lg font-semibold tracking-wider grow w-0 min-w-0 max-w-xs"
        minlength="3"
        maxlength="20"
        spellcheck="false"
        autocomplete="off"
        required
        :value="`Chez ${userStore.user?.username ?? 'Guest'}`"
      />
      <RockerSwitch left-switch="Public" right-switch="Privé" />
      <button type="submit" class="btn btn-primary px-10">
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
const gameStore = useGameStore();

const handleCreateRoom = () => {
  console.log('Room created');
};
</script>

<style>
.list-game-selection {
  @apply flex gap-3 mb-2 pb-1 overflow-x-scroll overflow-y-hidden;
}
</style>
