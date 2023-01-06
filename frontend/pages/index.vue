<template>
  <div class="flex flex-col gap-4 min-h-full">
    <div class="flex flex-col lg:flex-row items-stretch gap-4">
      <article id="create-room">
        <FormCreateRoom title="Créer un salon" button-title="Créer" />

        <SectionHider
          v-if="!userStore.isLogged"
          title="Se connecter"
          link="/auth/login"
        />
      </article>

      <article id="join-room">
        <FormJoinRoom title="Rejoindre un salon" button-title="Rejoindre" />
      </article>
    </div>

    <article id="your-rooms">
      <h1 class="mb-4 text-secondary">Vos salons</h1>
      <p v-if="roomStore.userRooms.length === 0" class="text-xl">
        Vous ne faites partie d'aucun salon…&nbsp;<Icon name="😿" />
      </p>

      <div v-if="userStore.isLogged" class="rooms-grid">
        <RoomCard
          v-for="room in roomStore.userRooms"
          :key="room.code"
          :room="room"
        />
      </div>

      <SectionHider v-else title="Se connecter" link="/auth/login" />
    </article>

    <article id="public-rooms" class="grow">
      <h1 class="mb-4">Salons publics</h1>
      <p v-if="roomStore.rooms.length === 0" class="text-xl">
        Aucun salon public n'est disponible…&nbsp;<Icon name="🐍" />
      </p>

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

await Promise.all([
  roomStore.findUserRooms(),
  roomStore.findAll(),
  gameStore.findAllDefinitions(),
]);
</script>

<style>
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

  border-width: 3px;
  border-style: dashed;
  @apply sm:rounded-md p-4;
}

#create-room h1,
#join-room h1,
#your-rooms h1,
#public-rooms h1 {
  @apply uppercase text-2xl font-bold;
}

#create-room,
#join-room {
  @apply border-primary;
}

#create-room {
  @apply w-full;
}

@media (min-width: 1024px) {
  #create-room {
    max-width: 66.66%;
  }
}

#join-room {
  @apply basis-3/4;
}

#your-rooms {
  @apply border-secondary h-36;
}
</style>
