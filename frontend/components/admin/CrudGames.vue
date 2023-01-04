<template>
  <article class="grow md:basis-5/6 flex flex-col">
    <h2 class="text-3xl mb-4 text-center">Modèles de jeu</h2>
    <div class="flex flex-wrap justify-center gap-4 mt-6 mb-8">
      <button class="btn btn-outline btn-warning" @click="deleteDefinitions">
        Supprimer&nbsp;<span class="hidden sm:inline">la sélection</span>
      </button>
      <Modal
        btn-title="Créer"
        btn-classes="btn btn-outline btn-success"
        modal-title="Créer un modèle de jeu"
      >
        <CreateDefinition />
      </Modal>
    </div>

    <div class="grow overflow-x-scroll">
      <table id="games-table" class="table table-compact w-full">
        <colgroup>
          <col class="w-0" />
          <col class="w-0" />
          <col class="w-0" />
          <col class="w-36" />
          <col class="w-36" />
          <col />
          <col class="w-28" />
          <col />
          <col class="w-36" />
        </colgroup>

        <thead>
          <tr>
            <th>
              <input v-model="checkboxAll" type="checkbox" class="checkbox" />
            </th>
            <th>Actions</th>
            <th>Activé</th>
            <th>Slug</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Couleur</th>
            <th class="text-center">
              <span class="block">Logo</span>
              <span class="badge badge-sm">actuel</span>
            </th>
            <th class="text-center">
              <span class="block">Logo</span>
              <span class="badge badge-sm">valeur</span>
            </th>
            <th>Créé le</th>
            <th>Mis à jour le</th>
          </tr>
        </thead>

        <tbody class="font-medium">
          <tr
            v-for="game in gameStore.sortedAdminDefinitions"
            :key="game.slug"
            :data-game-slug="game.slug"
            class="hover"
          >
            <th>
              <label>
                <input type="checkbox" class="checkbox delete-checkbox" />
              </label>
            </th>
            <td class="text-center">
              <button
                type="button"
                class="btn btn-success btn-xs"
                @click="patchDefinition(game)"
              >
                SAUV
              </button>
            </td>
            <td class="text-center">
              <input
                v-model="game.enabled"
                type="checkbox"
                class="toggle toggle-success"
                @change="switchDefinition(game)"
              />
            </td>
            <td>
              <input type="text" :value="game.slug" class="input" />
            </td>
            <td>
              <input type="text" :value="game.name" class="input" />
            </td>
            <td>
              <textarea :value="game.description" class="input" />
            </td>
            <td>
              <input type="text" :value="game.color" class="input" />
            </td>
            <td class="text-center">
              <Icon :name="game.logo" size="20px" />
            </td>
            <td>
              <input type="text" :value="game.logo" class="input" />
            </td>
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
      </table>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  GameDefinitionAdminType,
  UpdateDefinitionDto,
} from '~/typings/game.type';
import CreateDefinition from '~/components/form/CreateDefinition.vue';

const gameStore = useGameStore();
await gameStore.findAllDefinitionsHasAdmin();

const patchDefinition = (oldGame: GameDefinitionAdminType) => {
  const newValues: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    `#games-table tr[data-game-slug="${oldGame.slug}"] input[type="text"],
             #games-table tr[data-game-slug="${oldGame.slug}"] textarea`
  );
  if (5 === newValues.length - 1) return;

  const newGame: UpdateDefinitionDto = {};
  if (oldGame.slug !== newValues[0].value) newGame.slug = newValues[0].value;
  if (oldGame.name !== newValues[1].value) newGame.name = newValues[1].value;
  if (oldGame.description !== newValues[2].value)
    newGame.description = newValues[2].value;
  if (oldGame.color !== newValues[3].value) newGame.color = newValues[3].value;
  if (oldGame.logo !== newValues[4].value) newGame.logo = newValues[4].value;

  if (Object.keys(newGame).length === 0) return;
  gameStore.patchDefinition(oldGame.slug, newGame);
};

const switchDefinition = (game: GameDefinitionAdminType) => {
  gameStore
    .switchDefinition(game.slug)
    .then((result) => (game.enabled = result));
};

const deleteDefinitions = () => {
  const checkboxes = document.querySelectorAll(
    '#games-table tbody input[type="checkbox"].delete-checkbox:checked'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    if (!checkbox.checked) continue;

    const definition: HTMLElement | null =
      checkbox.closest('tr[data-game-slug]');
    if (null === definition) continue;
    if (undefined === definition.dataset.gameSlug) continue;

    gameStore.deleteDefinition(definition.dataset.gameSlug);
  }
};

// To check all checkbox
const checkboxAll = ref(false);
watch(checkboxAll, () => {
  const checkboxes = document.querySelectorAll(
    '#games-table .delete-checkbox'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of checkboxes) {
    checkbox.checked = checkboxAll.value;
  }
});
</script>

<style>
#games-table tbody .input {
  @apply input-sm input-bordered text-base w-full px-2;
}

#games-table thead th {
  @apply text-base;
}
</style>
