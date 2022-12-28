<template>
  <div>
    <article id="your-rooms">
      <h1 class="mb-4 text-accent">Vos parties&nbsp;:</h1>

      <div class="rooms-grid">
        <RoomCard v-for="room in yourRooms" :key="room.code" :room="room" />
      </div>
    </article>

    <article id="public-rooms">
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
  userCount: number;
}[] = [
  {
    code: 'r5t4r4trt',
    name: 'Chez Renéééééééééééééééé',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
];
const publicRooms: {
  code: string;
  name: string;
  state: string;
  gameDefinition: string;
  userCount: number;
}[] = [
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
  {
    code: 'r5t4r4trt',
    name: 'Chez René',
    state: 'PLAYING',
    gameDefinition: 'Bombparty',
    userCount: 6,
  },
];
</script>

<style scoped>
.rooms-grid {
  @apply flex flex-wrap gap-5;
}

.rooms-grid > * {
  @apply grow;
  flex-basis: 20%;
  max-width: 300px;
}

#your-rooms {
  border-width: 3px;
  border-style: dashed;
  @apply border-accent sm:rounded-md;

  padding: 0.5rem 1.5rem 1rem;
  margin-bottom: 1rem;
}

#public-rooms {
  border-width: 3px;
  border-style: dashed;
  @apply sm:rounded-md;

  padding: 0.5rem 1.5rem 1rem;
}
</style>
