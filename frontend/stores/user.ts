import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { UserType } from '~/typings/user.type';
import { Role } from '~/typings/roles.type';
import { JwtDataType } from '~/typings/auth.type';

export const useUserStore = defineStore(
  'user',
  () => {
    // State
    const user: Ref<UserType | null> = ref(null);

    // Imported stores
    const authStore = useAuthStore();
    const roomStore = useRoomStore();
    const gameStore = useGameStore();

    // Getters
    const isLogged = computed(() => {
      return authStore.isAuthenticated && null !== user.value;
    });

    const isAdmin = computed(() => {
      return null !== user.value && user.value.role === Role.ADMIN;
    });

    // Actions
    const init = (userData: JwtDataType) => {
      user.value = {
        id: userData.sub,
        username: userData.username,
        role: userData.role,
      };
    };

    const reset = () => {
      user.value = null;
      roomStore.resetUserRooms();
      gameStore.resetAdminGameDefinitions();
    };

    return { user, isLogged, isAdmin, init, reset };
  },
  { persist: { paths: ['user'] } }
);
