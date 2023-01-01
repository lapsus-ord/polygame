<template>
  <form class="flex flex-col gap-4 truncate h-full">
    <h1 class="text-primary">{{ title }}</h1>

    <div class="flex flex-col items-start justify-center grow lg:mb-16">
      <input
        type="text"
        placeholder="Code du salon"
        class="input input-bordered min-w-0 mb-4"
        required
        spellcheck="false"
        autocomplete="off"
      />
      <button type="submit" class="btn btn-primary">{{ buttonTitle }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  buttonTitle: string;
}>();
</script>
