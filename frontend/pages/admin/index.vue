<template>
  <div class="h-full flex flex-col">
    <h1 class="text-4xl text-center mb-6">Espace admin</h1>

    <AdminTab v-model:tab-picked="tab" />

    <AdminCrudUsers v-if="'users' === tab" />
    <AdminCrudRooms v-if="'rooms' === tab" />
    <AdminCrudGames v-if="'games' === tab" />
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

definePageMeta({
  middleware: 'auth',
  title: 'Espace admin',
});

const tab: Ref<string> = ref('users');
</script>
