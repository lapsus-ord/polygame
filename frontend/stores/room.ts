import { defineStore } from 'pinia';
import {
  RoomState,
  RoomType,
  RoomWithUserCountType,
  RoomWithUsersType,
} from '~/typings/room.type';
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
  create: {
    method: 'post',
    uri: '/rooms',
  },
  delete: {
    method: 'delete',
    uri: (roomCode: string) => `/rooms/${roomCode}`,
  },
};

export const useRoomStore = defineStore('room', () => {
  const rooms = ref([] as RoomType[]);
  const userRooms = ref([] as RoomType[]);

  const getRoomState = computed(() => (roomState: RoomState) => {
    if (RoomState.WAITING === roomState) return 'En attente';
    if (RoomState.IN_PROGRESS === roomState) return 'En jeu';
    if (RoomState.FINISHED === roomState) return 'Fini';
    return '';
  });

  const findAll = async (): Promise<ResultType> => {
    const config = useRuntimeConfig();
    const { data, error } = await useFetch<RoomWithUserCountType[]>(
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

  const create = async (
    name: string,
    definitionSlug: string,
    isPublic: boolean
  ) => {
    const { data, error } = await useAuthFetch(roomRoutes.create.uri, {
      method: roomRoutes.create.method,
      body: {
        isPublic: isPublic,
        name: name,
        gameDefinitionSlug: definitionSlug,
      },
    });
    if (null === data.value) return handleFetchError(error.value);

    const room: RoomWithUsersType = data.value;
    navigateTo(`/rooms/${room.code}`);

    return {
      hasSucceeded: true,
      data: { status: 0, messages: [] },
    };
  };

  const deleteRoom = async (roomCode: string) => {
    const { data, error } = await useAuthFetch(
      roomRoutes.delete.uri(roomCode),
      {
        method: roomRoutes.delete.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    refreshRooms();

    return {
      hasSucceeded: true,
      data: { status: 0, messages: [] },
    };
  };

  const refreshRooms = () => {
    Promise.all([findAll(), findUserRooms()]).then();
  };

  const resetUserRooms = () => {
    userRooms.value = [];
  };

  return {
    rooms,
    userRooms,
    getRoomState,
    findAll,
    findUserRooms,
    create,
    deleteRoom,
    refreshRooms,
    resetUserRooms,
  };
});
