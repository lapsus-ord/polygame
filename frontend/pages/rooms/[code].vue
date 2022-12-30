<template>
  <Title>Salon {{ code }}</Title>

  <div>{{ code }}</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'game',
});

const { code } = useRoute().params;
</script>
