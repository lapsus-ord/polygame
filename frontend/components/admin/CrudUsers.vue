<template>
  <article class="grow md:basis-5/6 overflow-x-scroll">
    <h2 class="text-3xl mb-4 text-center">Utilisateurs</h2>
    <div class="flex justify-center gap-4 mb-4">
      <button class="btn btn-outline btn-warning">
        Supprimer la sélection
      </button>
    </div>

    <table id="users-table" class="table table-compact w-full">
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
          <th>Pseudo</th>
          <th>Salons (actifs)</th>
          <th>Créé le</th>
          <th>Mis à jour le</th>
        </tr>
      </thead>

      <tbody class="font-bold">
        <tr v-for="user in usersProcessed" :key="user.id">
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td><button class="btn btn-info btn-xs">Ouvrir</button></td>
          <td>
            {{ user.username }}
            <span :class="`badge badge-sm ml-2 ${getUserBadge(user)}`">
              {{ user.role }}
            </span>
          </td>
          <td>{{ user.roomCount }}</td>
          <td>
            <time :datetime="user.createdAt">
              {{ getPrettyDate(user.createdAt) }}
            </time>
          </td>
          <td>
            <time :datetime="user.updatedAt">
              {{ getPrettyDate(user.updatedAt) }}
            </time>
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <th>
            <input v-model="checkboxAll" type="checkbox" class="checkbox" />
          </th>
          <th>Actions</th>
          <th>Pseudo</th>
          <th>Salons (actif)</th>
          <th>Créé le</th>
          <th>Mis à jour le</th>
        </tr>
      </tfoot>
    </table>
  </article>
</template>

<script setup lang="ts">
import { UserType } from '~/typings/user.type';
import { Ref } from 'vue';
import { Role } from '~/typings/roles.type';

const userStore = useUserStore();
await userStore.findAll();

const getUserBadge = (user: UserType) => {
  if (user.role === Role.ADMIN) return 'badge-warning';
  return '';
};

const users = userStore.usersForAdmin;
const usersProcessed: Ref<Array<UserType & { roomCount: string }>> = ref([]);

for (const user of users) {
  const roomCount = await userStore.getRoomCountByUserId(user.id);
  const result =
    roomCount > 1 || roomCount === 0
      ? `${roomCount} salons`
      : `${roomCount} salon`;
  usersProcessed.value.push({
    ...user,
    roomCount: result,
  });
}

const checkboxAll = ref(false);

watch(checkboxAll, () => {
  const checkboxes = document.querySelectorAll(
    '#users-table .checkbox'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    checkbox.checked = checkboxAll.value;
  }
});
</script>
