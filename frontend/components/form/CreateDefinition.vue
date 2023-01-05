<template>
  <form class="flex flex-col gap-4" @submit.prevent="createDefinition">
    <label class="input-group input-group-vertical">
      <span class="required">Slug</span>
      <input
        v-model="slug"
        type="text"
        required
        placeholder="sluggable-slug"
        class="input"
      />
    </label>

    <label class="input-group input-group-vertical">
      <span class="required">Nom</span>
      <input
        v-model="name"
        type="text"
        required
        placeholder="Le nom affiché"
        class="input"
      />
    </label>

    <label class="input-group input-group-vertical">
      <span>Description</span>
      <textarea
        v-model="description"
        class="textarea"
        rows="3"
        placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, ipsam labore nisi pariatur perspiciatis provident quae sequi sit vel voluptate?"
      ></textarea>
    </label>

    <label class="input-group input-group-vertical">
      <span>Couleur</span>
      <input
        v-model="color"
        type="text"
        placeholder="La couleur du jeu en hexadecimal"
        class="input"
      />
    </label>

    <div class="form-control">
      <label class="input-group input-group-vertical">
        <span>Logo</span>
        <input v-model="logo" type="text" placeholder="🕹" class="input" />
      </label>
      <label class="label">
        <span class="label-text">
          <span>De</span>
          <a href="https://icones.js.org/" class="link link-hover">
            icones.js.org
          </a>
          <span>ou un emoji normal</span>
        </span>
      </label>
    </div>

    <button type="submit" class="btn btn-success mt-2">Créer</button>
  </form>
</template>

<script setup lang="ts">
import { CreateDefinitionDto } from '~/typings/game.type';

defineProps<{
  afterSubmit?: () => void;
}>();

const gameStore = useGameStore();

const slug = ref('');
const name = ref('');
const description = ref('');
const color = ref('');
const logo = ref('');

const createDefinition = () => {
  const dto: CreateDefinitionDto = {
    slug: slug.value,
    name: name.value,
  };

  if ('' !== description.value) dto.description = description.value;
  if ('' !== color.value) dto.color = color.value;
  if ('' !== logo.value) dto.logo = logo.value;

  gameStore.createDefinition(dto);
};
</script>

<style scoped>
.input-group-vertical span {
  @apply py-1;
}

.required::after {
  content: '*';
  @apply text-lg text-red-600 ml-1;
}
</style>
