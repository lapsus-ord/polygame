<template>
  <div class="section-hider">
    <div>
      <NuxtLink :to="link" class="btn btn-lg btn-accent">
        {{ title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  link: string;
}>();
</script>

<style>
.section-hider {
  @apply z-20 absolute top-0 left-0 w-full h-full
  flex items-center justify-center bg-black/40;
}
</style>
