<template>
  <form class="flex flex-col gap-4 h-full" @submit.prevent="handleJoinRoom">
    <h1 class="text-primary">{{ title }}</h1>

    <div class="flex flex-col items-start justify-center grow lg:mb-16">
      <input
        v-model="roomCode"
        type="text"
        placeholder="Code du salon"
        class="input input-bordered w-full sm:w-44 mb-4"
        minlength="10"
        maxlength="10"
        required
        spellcheck="false"
        autocomplete="off"
      />
      <button type="submit" class="btn btn-primary w-full sm:w-44">
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

const roomCode = ref('');

const handleJoinRoom = () => {
  navigateTo(`/rooms/${roomCode.value}`);
};
</script>
