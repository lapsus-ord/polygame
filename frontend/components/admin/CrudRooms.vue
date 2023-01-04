<template>
  <article class="grow md:basis-5/6 flex flex-col">
    <h2 class="text-3xl mb-4 text-center">Salons (actifs)</h2>
    <div class="flex flex-wrap justify-center gap-4 mt-6 mb-8">
      <button class="btn btn-outline btn-warning" @click="deleteRooms">
        Supprimer&nbsp;<span class="hidden sm:inline">la sélection</span>
      </button>
    </div>

    <div class="grow overflow-x-scroll">
      <table id="rooms-table" class="table table-compact w-full">
        <colgroup>
          <col class="w-0" />
        </colgroup>

        <thead>
          <tr>
            <th>
              <input v-model="checkboxAll" type="checkbox" class="checkbox" />
            </th>
            <th>Nom</th>
            <th>Type</th>
            <th>Jeu</th>
            <th>Créateur</th>
            <th>Participants</th>
            <th>Créé le</th>
            <th>Mis à jour le</th>
          </tr>
        </thead>

        <tbody class="font-medium">
          <tr
            v-for="room in roomStore.adminRooms"
            :key="room.code"
            :data-room-id="room.code"
            class="hover"
          >
            <th>
              <label>
                <input type="checkbox" class="checkbox delete-checkbox" />
              </label>
            </th>
            <td class="link hover:no-underline">
              <NuxtLink :to="`/rooms/${room.code}`">{{ room.name }}</NuxtLink>
            </td>
            <td>
              <span v-if="room.isPublic" class="badge badge-sm">Public</span>
              <span v-else class="badge badge-sm">Privé</span>
            </td>
            <td>
              {{
                gameStore.getDefinition(room.gameDefinition)?.name ??
                room.gameDefinition
              }}
            </td>
            <td>{{ room.creator.username }}</td>
            <td>{{ userPlurals(room.userCount) }}</td>
            <td>
              <time :datetime="room.createdAt">
                {{ getPrettyDate(room.createdAt) }}
              </time>
            </td>
            <td>
              <time :datetime="room.updatedAt">
                {{ getPrettyDate(room.updatedAt) }}
              </time>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>

<script setup lang="ts">
import { getPrettyDate } from '~/utils/getPrettyDate';

const roomStore = useRoomStore();
const gameStore = useGameStore();
await roomStore.findAllAdmin();

const userPlurals = (userCount: number) => {
  return userCount > 1 || userCount === 0
    ? `${userCount} joueurs`
    : `${userCount} joueur`;
};

const deleteRooms = () => {
  const checkboxes = document.querySelectorAll(
    '#rooms-table tbody input[type="checkbox"].delete-checkbox:checked'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    if (!checkbox.checked) continue;

    const room: HTMLElement | null = checkbox.closest('tr[data-room-id]');
    if (null === room) continue;
    if (undefined === room.dataset.roomId) continue;

    roomStore.deleteRoom(room.dataset.roomId);
  }
};

// To check all checkbox
const checkboxAll = ref(false);
watch(checkboxAll, () => {
  const checkboxes = document.querySelectorAll(
    '#rooms-table .delete-checkbox'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    checkbox.checked = checkboxAll.value;
  }
});
</script>

<style>
#rooms-table thead th,
#rooms-table tbody td {
  @apply text-base;
}
</style>
