import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { UserType } from '~/typings/user.type';
import { Role } from '~/typings/roles.type';

export const useAuthStore = defineStore(
  'auth',
  () => {
    // const jwt: Ref<JwtType | null> = ref(null);
    const user: Ref<UserType | null> = ref(null);

    const isAuthenticated = computed(() => null !== user.value);

    const isAdmin = computed(() => {
      return isAuthenticated && user.value?.roles === Role.ADMIN;
    });

    const login = (login: string, password: string): boolean => {
      user.value = {
        id: 1,
        username: login,
        roles: Role.ADMIN,
      };

      return true;
    };

    const logout = () => {
      user.value = null;
    };

    return { user, isAuthenticated, isAdmin, login, logout };
  },
  { persist: { paths: ['user'] } }
);
