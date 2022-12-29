<template>
  <div>
    <h1>My profile.</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  title: 'Mon profil',
});
</script>
