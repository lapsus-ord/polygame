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
          <th>Logo</th>
          <th>Activé</th>
          <th>Créé le</th>
          <th>Mis à jour le</th>
        </tr>
      </thead>

      <tbody class="font-bold">
        <tr v-for="game in gameStore.adminDefinitions" :key="game.slug">
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <td><button class="btn btn-info btn-xs">Ouvrir</button></td>
          <td>{{ game.slug }}</td>
          <td>{{ game.name }}</td>
          <td><Icon :name="game.logo" size="20px" /></td>
          <td v-if="game.enabled">
            <Icon name="twemoji:check-mark-button" size="20px" />
          </td>
          <td v-else><Icon name="twemoji:cross-mark" size="20px" /></td>
          <td>
            <time :datetime="game.createdAt">
              {{ getPrettyDate(game.createdAt) }}
            </time>
          </td>
          <td>
            <time :datetime="game.updatedAt">
              {{ getPrettyDate(game.updatedAt) }}
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
          <th>Slug</th>
          <th>Nom</th>
          <th>Logo</th>
          <th>Activé</th>
          <th>Créé le</th>
          <th>Mis à jour le</th>
        </tr>
      </tfoot>
    </table>
  </article>
</template>

<script setup lang="ts">
const gameStore = useGameStore();
await gameStore.findAllDefinitionsHasAdmin();

const checkboxAll = ref(false);

watch(checkboxAll, () => {
  const checkboxes = document.querySelectorAll(
    '#games-table .checkbox'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    checkbox.checked = checkboxAll.value;
  }
});
</script>
