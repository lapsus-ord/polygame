<template>
  <aside v-if="toastStore.hasToasts" class="toast toast-bottom toast-end">
    <div
      v-for="(toast, index) in toastStore.getToasts"
      :key="index"
      :class="`alert ${getAlertType(toast.type)}`"
    >
      <div>
        <span class="hidden load-alert-type"></span>
        <button type="button" @click="toastStore.remove(index)">
          <Icon name="mdi:close-circle" size="1.5rem" />
        </button>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ToastType } from '~/stores/toast';

const toastStore = useToastStore();

const getAlertType = computed(() => (type: ToastType) => `alert-${type}`);
</script>

<style>
.toast {
  min-width: 33%;
  max-width: 33%;
  @apply z-30 drop-shadow-md w-1/3;
}

.load-alert-type {
  @apply alert-info alert-success alert-warning alert-error;
}

.toast .alert {
  min-height: 70px;
  @apply p-3 text-xl tracking-wide font-medium;
}

.toast .alert button {
  @apply flex items-center p-1 hover:text-white hover:bg-base-100/20 rounded-md transition-colors;
}
</style>
