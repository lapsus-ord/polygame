<template>
  <article class="grow md:basis-5/6">
    <h2 class="text-3xl mb-4 text-center">Modèles de jeu</h2>
    <div class="flex justify-center gap-4 mb-4">
      <button class="btn btn-outline btn-warning">
        Supprimer la sélection
      </button>
    </div>

    <div class="overflow-x-scroll">
      <table id="games-table" class="table table-compact w-full">
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
            v-for="game in gameStore.adminDefinitions"
            :key="game.slug"
            :data-game-slug="game.slug"
            class="hover"
          >
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
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
            <td v-if="game.enabled" class="text-center">
              <Icon name="twemoji:check-mark-button" size="20px" />
            </td>
            <td v-else class="text-center">
              <Icon name="twemoji:cross-mark" size="20px" />
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
import { GameDefinitionAdminType } from '~/typings/game.type';

const gameStore = useGameStore();
await gameStore.findAllDefinitionsHasAdmin();

const patchDefinition = (oldGame: GameDefinitionAdminType) => {
  console.log(oldGame);
  const newGame: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    `#games-table tr[data-game-slug="${oldGame.slug}"] input[type="text"]`
  );
  if (5 === newGame.length - 1) return;

  console.log(`slug: ${newGame[0].value}`);
  console.log(`name: ${newGame[1].value}`);
  console.log(`logo: ${newGame[2].value}`);
  console.log(`description: ${newGame[3].value}`);
  console.log(`color: ${newGame[4].value}`);
};

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

<style>
#games-table tbody .input {
  @apply input-sm input-bordered text-base w-full px-2;
}
</style>
