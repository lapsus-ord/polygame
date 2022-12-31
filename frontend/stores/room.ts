import { defineStore } from 'pinia';
import { RoomType } from '~/typings/room.type';
import { ResultType } from '~/typings/auth.type';

const roomRoutes = {
  findAll: {
    method: 'get',
    uri: '/rooms',
  },
  findUserRooms: {
    method: 'get',
    uri: (userId: number) => `/users/${userId}/rooms`,
  },
};

export const useRoomStore = defineStore('room', () => {
  const rooms = ref([] as RoomType[]);
  const userRooms = ref([] as RoomType[]);

  const findAll = async (): Promise<ResultType> => {
    const config = useRuntimeConfig();
    const { data, error } = await useFetch<RoomType[]>(
      config.public.api_base + roomRoutes.findAll.uri,
      {
        method: roomRoutes.findAll.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    rooms.value = data.value;

    return {
      hasSucceeded: true,
      data: { status: 0, messages: [] },
    };
  };

  const findUserRooms = async () => {
    const userStore = useUserStore();
    if (!userStore.isLogged) {
      return {
        hasSucceeded: false,
        data: { status: 0, messages: [] },
      };
    }

    const userId = userStore.user?.id ?? 0;

    const { data, error } = await useAuthFetch(
      roomRoutes.findUserRooms.uri(userId),
      {
        method: roomRoutes.findUserRooms.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    userRooms.value = data.value;

    return {
      hasSucceeded: true,
      data: { status: 0, messages: [] },
    };
  };

  const resetUserRooms = () => {
    userRooms.value = [];
  };

  return { rooms, userRooms, findAll, findUserRooms, resetUserRooms };
});
