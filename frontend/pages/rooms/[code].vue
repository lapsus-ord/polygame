<template>
  <div>{{ code }}</div>
</template>

<script setup lang="ts">
const { code } = useRoute().params;
</script>
