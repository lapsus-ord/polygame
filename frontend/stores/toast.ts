import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([] as { type: ToastType; message: string }[]);

  const hasToasts = computed(() => toasts.value.length > 0);

  const getToasts = computed(() => toasts.value);

  const push = (type: ToastType, message: string) => {
    toasts.value.push({ type, message });
    // after 3s remove the toast
    setTimeout(() => {
      remove(0);
    }, 3000);
  };

  const remove = (index: number) => {
    if (index < 0 || index > toasts.value.length - 1) return;

    toasts.value.splice(index, 1);
  };

  return { hasToasts, getToasts, push, remove };
});

export const ToastType = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

export type ToastType = typeof ToastType[keyof typeof ToastType];
