<template>
  <article class="grow md:basis-5/6 overflow-x-scroll">
    <h2 class="text-3xl mb-4 text-center">Salons (actifs)</h2>
    <div class="flex justify-center gap-4 mb-4">
      <button class="btn btn-outline btn-warning">
        Supprimer la sélection
      </button>
    </div>

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
          <th>Créateur</th>
          <th>Participants</th>
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
          <td>Chez René</td>
          <td>René</td>
          <td>2 utilisateur(s)</td>
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
          <td>Chez Bernard</td>
          <td>Bernard</td>
          <td>2 utilisateur(s)</td>
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
          <td>Chez Henry</td>
          <td>Henry</td>
          <td>2 utilisateur(s)</td>
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
          <th>Nom</th>
          <th>Créateur</th>
          <th>Participants</th>
          <th>Créé le</th>
        </tr>
      </tfoot>
    </table>
  </article>
</template>

<script setup lang="ts">
const checkboxAll = ref(false);

onBeforeMount(() => console.log('rooms tab loaded'));

watch(checkboxAll, () => {
  const checkboxes = document.querySelectorAll(
    '#rooms-table .checkbox'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    checkbox.checked = checkboxAll.value;
  }
});
</script>
