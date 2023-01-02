import { defineStore } from 'pinia';
import {
  RoomState,
  RoomWithUserCountType,
  RoomWithUsersType,
} from '~/typings/room.type';

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
  const rooms = ref([] as RoomWithUserCountType[]);
  const userRooms = ref([] as RoomWithUserCountType[]);

  const config = useRuntimeConfig();
  const userStore = useUserStore();
  const toastStore = useToastStore();

  const getRoomState = computed(() => (roomState: RoomState) => {
    switch (roomState) {
      case RoomState.WAITING:
        return 'En attente';
      case RoomState.IN_PROGRESS:
        return 'En jeu';
      case RoomState.FINISHED:
        return 'Fini';
      default:
        return '';
    }
  });

  const userOwnsTheRoom = computed(() => (roomCode: string): boolean => {
    if (!userStore.isLogged) return false;

    let room: RoomWithUserCountType | undefined;

    room = rooms.value.find((room) => room.code === roomCode);
    if (undefined === room) {
      room = userRooms.value.find((room) => room.code === roomCode);
    }

    if (undefined === room) return false;

    return room.creator.id === userStore.user?.id;
  });

  const findAll = async (): Promise<boolean> => {
    const { data, error } = await useFetch<RoomWithUserCountType[]>(
      config.public.api_base + roomRoutes.findAll.uri,
      {
        method: roomRoutes.findAll.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    rooms.value = data.value;

    return true;
  };

  const findUserRooms = async (): Promise<boolean> => {
    if (!userStore.isLogged) return false;

    const userId = userStore.user?.id ?? 0;

    const { data, error } = await useAuthFetch(
      roomRoutes.findUserRooms.uri(userId),
      {
        method: roomRoutes.findUserRooms.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    userRooms.value = data.value;

    return true;
  };

  const create = async (
    name: string,
    definitionSlug: string,
    isPublic: boolean
  ): Promise<boolean> => {
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
    toastStore.push(ToastType.SUCCESS, 'Création du salon réussi 👍');

    return true;
  };

  const deleteRoom = async (roomCode: string): Promise<boolean> => {
    const { data, error } = await useAuthFetch(
      roomRoutes.delete.uri(roomCode),
      {
        method: roomRoutes.delete.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    toastStore.push(
      ToastType.SUCCESS,
      `Suppression du salon "${data.value.name}" réussi 👍`
    );
    refreshRooms();

    return true;
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
    userOwnsTheRoom,
    findAll,
    findUserRooms,
    create,
    deleteRoom,
    refreshRooms,
    resetUserRooms,
  };
});
