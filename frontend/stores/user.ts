import { defineStore } from 'pinia';
import { Ref } from 'vue';
import { UpdateUserDto, UserType } from '~/typings/user.type';
import { Role } from '~/typings/roles.type';
import { JwtDataType } from '~/typings/auth.type';
import { roomRoutes } from '~/stores/room';

const userRoutes = {
  findAll: {
    method: 'GET',
    uri: '/users',
  },
  find: {
    method: 'GET',
    uri: (userId: number) => `/users/${userId}`,
  },
  patch: {
    method: 'PATCH',
    uri: (userId: number) => `/users/${userId}`,
  },
  delete: {
    method: 'DELETE',
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
    const roomStore = useRoomStore();
    const gameStore = useGameStore();
    const toastStore = useToastStore();

    // Getters
    const isLogged = computed(() => {
      return null !== user.value;
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

    const sortedUsers = computed((): UserType[] => {
      return usersForAdmin.value.sort((a, b) => {
        const createdUserA = new Date(a.createdAt).getTime();
        const createdUserB = new Date(b.createdAt).getTime();
        return createdUserA - createdUserB;
      });
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

    const patch = async (userId: number, dto: UpdateUserDto) => {
      const { data, error } = await useAuthFetch(userRoutes.patch.uri(userId), {
        method: userRoutes.patch.method,
        body: dto,
      });
      if (null === data.value) return handleFetchError(error.value);

      toastStore.push(
        ToastType.SUCCESS,
        `Utilisateur '${data.value.username}' modifié avec succès`
      );
      findAll().then();

      return true;
    };

    const deleteUser = async (userId: number) => {
      const { data, error } = await useAuthFetch(
        userRoutes.delete.uri(userId),
        {
          method: userRoutes.delete.method,
        }
      );
      if (null === data.value) return handleFetchError(error.value);

      toastStore.push(
        ToastType.SUCCESS,
        `Utilisateur '${data.value.username}' supprimé avec succès`
      );

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
      sortedUsers,
      findAll,
      patch,
      deleteUser,
      init,
      reset,
    };
  },
  { persist: { paths: ['user'] } }
);
