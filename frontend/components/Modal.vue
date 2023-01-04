<template>
  <div>
    <button type="button" :class="btnClasses ?? 'btn'" @click="checkbox = true">
      {{ btnTitle }}
    </button>

    <input v-model="checkbox" type="checkbox" class="modal-toggle" />
    <div class="modal cursor-pointer" @click.self="checkbox = false">
      <div class="modal-box bg-neutral relative cursor-auto">
        <h3 class="text-2xl font-bold">{{ modalTitle }}</h3>
        <div class="pt-4">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  btnTitle: string;
  btnClasses?: string;
  modalTitle: string;
}>();

const checkbox = ref(false);
</script>
