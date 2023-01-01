<template>
  <div class="flex flex-col gap-4 min-h-full">
    <div class="flex flex-wrap gap-4">
      <article id="create-room">
        <h1 class="mb-4 text-primary">Créer un salon&nbsp;</h1>

        <form @submit.prevent="handleCreateRoom">
          <div class="flex flex-nowrap overflow-x-scroll gap-4">
            <GameDefinitionCard
              v-for="definition in gameStore.definitions"
              :key="definition.slug"
              :definition="definition"
            />
          </div>
          <div class="flex flex-wrap items-center">
            <input
              type="text"
              placeholder="Nom du salon"
              class="input input-bordered w-48"
              :value="`Chez ${userStore.user?.username ?? 'Guest'}`"
            />
            <RockerSwitch left-switch="Public" right-switch="Privé" />
            <button type="submit" class="btn btn-primary">Créer</button>
          </div>
        </form>

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

      <article id="join-room">
        <h1 class="mb-12 text-primary">Rejoindre un salon</h1>

        <form class="flex flex-col items-center justify-center gap-4">
          <input
            type="text"
            placeholder="Code du salon"
            class="input input-bordered w-fit"
          />
          <button type="submit" class="btn btn-primary">Rejoindre</button>
        </form>
      </article>
    </div>

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
const gameStore = useGameStore();

Promise.all([
  roomStore.findUserRooms(),
  roomStore.findAll(),
  gameStore.findAllDefinitions(),
]);

const handleCreateRoom = () => {
  console.log('Create room');
};
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
#join-room,
#your-rooms,
#public-rooms {
  position: relative;
  min-height: 140px;

  border-width: 3px;
  border-style: dashed;
  @apply sm:rounded-md;

  padding: 0.5rem 1.5rem 1rem;
}

#create-room,
#join-room {
  @apply border-primary;
}

#create-room {
  @apply grow;
}

#your-rooms {
  @apply border-secondary;
}
</style>
