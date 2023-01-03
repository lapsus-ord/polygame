<template>
  <article class="grow md:basis-5/6">
    <h2 class="text-3xl mb-4 text-center">Salons (actifs)</h2>
    <div class="flex justify-center gap-4 mb-4">
      <button class="btn btn-outline btn-warning">
        Supprimer la sélection
      </button>
    </div>

    <div class="overflow-x-scroll">
      <table id="rooms-table" class="table table-compact w-full">
        <colgroup>
          <col class="w-0" />
          <col class="w-0" />
        </colgroup>

        <thead>
          <tr>
            <th>
              <input v-model="checkboxAll" type="checkbox" class="checkbox" />
            </th>
            <th>Actions</th>
            <th>Nom</th>
            <th>Type</th>
            <th>Créateur</th>
            <th>Participants</th>
            <th>Créé le</th>
            <th>Mis à jour le</th>
          </tr>
        </thead>

        <tbody class="font-bold">
          <tr v-for="room in roomStore.adminRooms" :key="room.code">
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <td><button class="btn btn-info btn-xs">Ouvrir</button></td>
            <td class="link hover:no-underline">
              <NuxtLink :to="`/rooms/${room.code}`">{{ room.name }}</NuxtLink>
            </td>
            <td v-if="room.isPublic" class="badge">Public</td>
            <td v-else class="badge badge-sm">Privé</td>
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
await roomStore.findAllAdmin();

const userPlurals = (userCount: number) => {
  return userCount > 1 || userCount === 0
    ? `${userCount} joueurs`
    : `${userCount} joueur`;
};

const checkboxAll = ref(false);

watch(checkboxAll, () => {
  const checkboxes = document.querySelectorAll(
    '#rooms-table .checkbox'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    checkbox.checked = checkboxAll.value;
  }
});
</script>
