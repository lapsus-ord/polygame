<template>
  <article class="grow md:basis-5/6 flex flex-col">
    <h2 class="text-3xl mb-4 text-center">Utilisateurs</h2>
    <div class="flex flex-wrap justify-center gap-4 mt-6 mb-8">
      <button class="btn btn-outline btn-warning" @click="deleteUsers">
        Supprimer la sélection
      </button>
    </div>

    <div class="grow overflow-x-scroll">
      <table id="users-table" class="table table-compact w-full">
        <colgroup>
          <col class="w-0" />
          <col class="w-0" />
          <col class="w-60" />
        </colgroup>

        <thead>
          <tr>
            <th>
              <input v-model="checkboxAll" type="checkbox" class="checkbox" />
            </th>
            <th>Actions</th>
            <th>Pseudo</th>
            <th>Rôle</th>
            <th>Salons (actifs)</th>
            <th>Créé le</th>
            <th>Mis à jour le</th>
          </tr>
        </thead>

        <tbody class="font-medium">
          <tr
            v-for="user in usersProcessed"
            :key="user.id"
            :data-user-id="user.id"
            class="hover"
          >
            <th>
              <label v-if="user.id !== userStore.user?.id">
                <input type="checkbox" class="checkbox delete-checkbox" />
              </label>
            </th>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-success btn-xs"
                @click="patchUser(user)"
              >
                SAUV
              </button>
            </td>
            <td><input type="text" :value="user.username" class="input" /></td>
            <td>
              <select class="select select-bordered select-sm">
                <option
                  :value="Role.ADMIN"
                  :selected="user.role === Role.ADMIN"
                >
                  {{ Role.ADMIN }}
                </option>
                <option :value="Role.USER" :selected="user.role === Role.USER">
                  {{ Role.USER }}
                </option>
              </select>
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
      </table>
    </div>
  </article>
</template>

<script setup lang="ts">
import { Ref } from 'vue';
import { UpdateUserDto, UserType } from '~/typings/user.type';
import { Role } from '~/typings/roles.type';

const userStore = useUserStore();

const usersProcessed: Ref<Array<UserType & { roomCount: string }>> = ref([]);
const refreshUsers = async () => {
  await userStore.findAll();

  for (const user of userStore.sortedUsers) {
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
};

await refreshUsers();

const patchUser = (oldUser: UserType) => {
  const newValues: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    `#users-table tr[data-user-id="${oldUser.id}"] input[type="text"],
             #users-table tr[data-user-id="${oldUser.id}"] select`
  );
  if (2 === newValues.length - 1) return;

  const newUser: UpdateUserDto = {};
  if (oldUser.username !== newValues[0].value)
    newUser.username = newValues[0].value;
  if (oldUser.role !== newValues[1].value) newUser.role = newValues[1].value;

  if (Object.keys(newUser).length === 0) return;
  userStore.patch(oldUser.id, newUser);
};

const deleteUsers = () => {
  const checkboxes = document.querySelectorAll(
    '#users-table tbody input[type="checkbox"].delete-checkbox:checked'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    if (!checkbox.checked) continue;

    const user: HTMLElement | null = checkbox.closest('tr[data-user-id]');
    if (null === user) continue;
    if (undefined === user.dataset.userId) continue;

    userStore.deleteUser(Number(user.dataset.userId));
  }
};

// To check all checkbox
const checkboxAll = ref(false);
watch(checkboxAll, () => {
  const checkboxes = document.querySelectorAll(
    '#users-table .delete-checkbox'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    checkbox.checked = checkboxAll.value;
  }
});
</script>

<style>
#users-table tbody .input {
  @apply input-sm input-bordered text-base w-full px-2;
}

#users-table thead th,
#users-table tbody td {
  @apply text-base;
}
</style>
