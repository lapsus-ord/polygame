import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { UserType } from '~/typings/user.type';
import { Role } from '~/typings/roles.type';
import { JwtDataType } from '~/typings/auth.type';
import { roomRoutes } from '~/stores/room';

const userRoutes = {
  findAll: {
    method: 'get',
    uri: '/users',
  },
  find: {
    method: 'get',
    uri: (userId: number) => `/users/${userId}`,
  },
};

export const useUserStore = defineStore(
  'user',
  () => {
    // State
    const user: Ref<UserType | null> = ref(null);
    const usersForAdmin: Ref<UserType[]> = ref([]);

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

    const getRoomCountByUserId = computed(() => async (userId: number) => {
      if (!isAdmin) return 0;

      const { data, error } = await useAuthFetch(
        roomRoutes.findUserRooms.uri(userId),
        {
          method: roomRoutes.findUserRooms.method,
        }
      );
      if (null === data.value) {
        handleFetchError(error.value);
        return 0;
      }

      return data.value.length;
    });

    // Actions
    const findAll = async () => {
      if (!isLogged || !isAdmin) return false;

      const { data, error } = await useAuthFetch(userRoutes.findAll.uri, {
        method: userRoutes.findAll.method,
      });
      if (null === data.value) return handleFetchError(error.value);

      usersForAdmin.value = data.value;

      return true;
    };

    const find = async (userId: number) => {
      const { data, error } = await useAuthFetch(userRoutes.find.uri(userId), {
        method: userRoutes.find.method,
      });
      if (null === data.value) return handleFetchError(error.value);

      user.value = data.value;

      return true;
    };

    const init = (userData: JwtDataType) => {
      find(userData.sub).then();
    };

    const reset = () => {
      user.value = null;
      roomStore.resetUserRooms();
      gameStore.resetAdminGameDefinitions();
    };

    return {
      user,
      usersForAdmin,
      isLogged,
      isAdmin,
      getRoomCountByUserId,
      findAll,
      init,
      reset,
    };
  },
  { persist: { paths: ['user'] } }
);
