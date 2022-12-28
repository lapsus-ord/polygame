<template>
  <div>
    <article class="border-accent border-2 rounded-md px-6 pb-4 mb-4">
      <h1 class="mb-4 text-accent">Vos parties&nbsp;:</h1>

      <div class="rooms-grid">
        <RoomCard v-for="room in yourRooms" :key="room.code" :room="room" />
      </div>
    </article>

    <article class="px-6 pb-4">
      <h1 class="mb-4">Parties en cours&nbsp;:</h1>

      <div class="rooms-grid">
        <RoomCard v-for="room in publicRooms" :key="room.code" :room="room" />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const yourRooms: {
  code: string;
  name: string;
  state: string;
  gameDefinition: string;
  nbOfUsers: number;
}[] = [
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
];
const publicRooms: {
  code: string;
  name: string;
  state: string;
  gameDefinition: string;
  nbOfUsers: number;
}[] = [
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    nbOfUsers: 6,
  },
];
</script>

<style scoped>
.rooms-grid {
  @apply grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5;
}
</style>
