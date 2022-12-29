<template>
  <article class="grow md:basis-5/6 overflow-x-scroll">
    <h2 class="text-3xl mb-4 text-center">Modèles de jeu</h2>
    <div class="flex justify-center gap-4 mb-4">
      <button class="btn btn-outline btn-warning">
        Supprimer la sélection
      </button>
    </div>

    <table id="games-table" class="table table-compact w-full">
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
          <th>Slug</th>
          <th>Nom</th>
          <th>Activé</th>
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
          <td>bombparty</td>
          <td>Bomb Party</td>
          <td><Icon name="twemoji:check-mark-button" size="20px" /></td>
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
          <td>cowboy-clicker</td>
          <td>Ready Steady Bang</td>
          <td><Icon name="twemoji:cross-mark" size="20px" /></td>
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
          <th>Slug</th>
          <th>Nom</th>
          <th>Activé</th>
          <th>Créé le</th>
        </tr>
      </tfoot>
    </table>
  </article>
</template>

<script setup lang="ts">
const checkboxAll = ref(false);

onBeforeMount(() => console.log('games tab loaded'));

watch(checkboxAll, () => {
  const checkboxes = document.querySelectorAll(
    '#games-table .checkbox'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    checkbox.checked = checkboxAll.value;
  }
});
</script>
