<template>
  <div class="h-full flex flex-col">
    <h1 class="text-4xl text-center mb-8">Espace admin</h1>

    <div class="grow flex">
      <aside class="hidden md:block basis-1/6">
        <h2 class="text-xl underline mb-6">Ressources</h2>
        <ul class="list-disc ml-8">
          <li class="link link-hover mb-4">Utilisateurs</li>
          <li class="link link-hover mb-4">Salons</li>
          <li class="link link-hover mb-4">Jeux</li>
        </ul>
      </aside>

      <article class="grow md:basis-5/6 overflow-x-scroll">
        <h2 class="text-3xl mb-6 text-center">Utilisateurs</h2>
        <div class="flex justify-center gap-4 mb-4">
          <button class="btn btn-outline btn-warning">Supprimer</button>
          <button class="btn btn-disabled">Sauvegarder</button>
        </div>

        <table id="crud" class="table table-compact w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>
                <input
                  v-model="usersCheckbox"
                  type="checkbox"
                  class="checkbox"
                />
              </th>
              <th>Pseudo</th>
              <th>Salons (actifs)</th>
            </tr>
          </thead>

          <tbody class="font-bold">
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>René<span class="badge badge-warning ml-2">admin</span></td>
              <td>5 salon(s)</td>
            </tr>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>Bernard</td>
              <td>0 salon(s)</td>
            </tr>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>Henry</td>
              <td>1 salon(s)</td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <th>
                <input
                  v-model="usersCheckbox"
                  type="checkbox"
                  class="checkbox"
                />
              </th>
              <th>Pseudo</th>
              <th>Salons (actif)</th>
            </tr>
          </tfoot>
        </table>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
const isAdmin = ref(true);
if (!isAdmin.value) navigateTo('/');

const usersCheckbox = ref(false);

watch(usersCheckbox, () => {
  const userCheckboxes = document.querySelectorAll(
    'table#crud .checkbox'
  ) as NodeListOf<HTMLInputElement>;

  for (const checkbox of userCheckboxes) {
    checkbox.checked = usersCheckbox.value;
  }
});
</script>
