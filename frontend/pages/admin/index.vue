<template>
  <Title>Espace admin</Title>
  <div class="h-full flex flex-col items-stretch">
    <h1 class="text-4xl text-center mb-6">Espace admin</h1>

    <AdminTab v-model:tab-picked="tab" class="self-center" />

    <AdminCrudUsers v-if="'users' === tab" />
    <AdminCrudRooms v-if="'rooms' === tab" />
    <AdminCrudGames v-if="'games' === tab" />
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

definePageMeta({
  middleware: 'auth',
});

const tab: Ref<string> = ref('users');
</script>
