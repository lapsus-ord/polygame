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
        </tr>
      </thead>

      <tbody class="font-bold">
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td><button class="btn btn-info btn-xs">Ouvrir</button></td>
          <td>
            René<span class="badge badge-warning badge-sm ml-2">admin</span>
          </td>
          <td>5 salon(s)</td>
          <td>
            <time datetime="12-09-2022T13:06:00">12/09/2022 à 13:06</time>
          </td>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td><button class="btn btn-info btn-xs">Ouvrir</button></td>
          <td>Bernard</td>
          <td>0 salon(s)</td>
          <td>
            <time datetime="12-09-2022T13:06:00">12/09/2022 à 13:06</time>
          </td>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td><button class="btn btn-info btn-xs">Ouvrir</button></td>
          <td>Henry</td>
          <td>1 salon(s)</td>
          <td>
            <time datetime="12-09-2022T13:06:00">12/09/2022 à 13:06</time>
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
        </tr>
      </tfoot>
    </table>
  </article>
</template>

<script setup lang="ts">
const checkboxAll = ref(false);

onBeforeMount(() => console.log('users tab loaded'));

watch(checkboxAll, () => {
  const checkboxes = document.querySelectorAll(
    '#users-table .checkbox'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    checkbox.checked = checkboxAll.value;
  }
});
</script>
