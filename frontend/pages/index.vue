<template>
  <div class="flex flex-col gap-4 min-h-full">
    <article id="create-room">
      <h1 class="mb-4 text-primary">Créer un salon&nbsp;</h1>

      <div
        v-if="!userStore.isLogged"
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40"
      >
        <div>
          <NuxtLink to="/auth/login" class="btn btn-lg btn-accent">
            Se connecter
          </NuxtLink>
        </div>
      </div>
    </article>

    <article id="your-rooms">
      <h1 class="mb-4 text-secondary">Vos salons</h1>

      <div v-if="userStore.isLogged" class="rooms-grid">
        <RoomCard
          v-for="room in roomStore.userRooms"
          :key="room.code"
          :room="room"
        />
      </div>

      <div
        v-else
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40"
      >
        <div>
          <NuxtLink to="/auth/login" class="btn btn-lg btn-accent">
            Se connecter
          </NuxtLink>
        </div>
      </div>
    </article>

    <article id="public-rooms" class="grow">
      <h1 class="mb-4">Salons publics</h1>

      <div class="rooms-grid">
        <RoomCard
          v-for="room in roomStore.rooms"
          :key="room.code"
          :room="room"
        />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const roomStore = useRoomStore();

Promise.all([roomStore.findUserRooms(), roomStore.findAll()]);
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

#create-room,
#your-rooms {
  position: relative;
  min-height: 140px;

  border-width: 3px;
  border-style: dashed;
  @apply sm:rounded-md;

  padding: 0.5rem 1.5rem 1rem;
}

#create-room {
  @apply border-primary;
}

#your-rooms {
  @apply border-secondary;
}

#public-rooms {
  border-width: 3px;
  border-style: dashed;
  @apply sm:rounded-md;

  padding: 0.5rem 1.5rem 1rem;
}
</style>
