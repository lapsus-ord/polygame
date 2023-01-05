import { defineStore } from 'pinia';
import {
  AdminRoomType,
  RoomState,
  RoomWithUserCountType,
  RoomWithUsersType,
} from '~/typings/room.type';
import { Ref } from 'vue';

export const roomRoutes = {
  findAll: {
    method: 'GET',
    uri: '/rooms',
  },
  findAllAdmin: {
    method: 'GET',
    uri: '/rooms/all',
  },
  findUserRooms: {
    method: 'GET',
    uri: (userId: number) => `/users/${userId}/rooms`,
  },
  findByCode: {
    method: 'GET',
    uri: (roomCode: string) => `/rooms/${roomCode}`,
  },
  create: {
    method: 'POST',
    uri: '/rooms',
  },
  delete: {
    method: 'DELETE',
    uri: (roomCode: string) => `/rooms/${roomCode}`,
  },
  join: {
    method: 'GET',
    uri: (roomCode: string) => `/rooms/${roomCode}/join`,
  },
  leave: {
    method: 'GET',
    uri: (roomCode: string) => `/rooms/${roomCode}/leave`,
  },
};

export const useRoomStore = defineStore('room', () => {
  const rooms: Ref<RoomWithUserCountType[]> = ref([]);
  const userRooms: Ref<RoomWithUserCountType[]> = ref([]);
  const adminRooms: Ref<AdminRoomType[]> = ref([]);

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

  const findAllAdmin = async (): Promise<boolean> => {
    const { data, error } = await useAuthFetch(roomRoutes.findAllAdmin.uri, {
      method: roomRoutes.findAllAdmin.method,
    });
    if (null === data.value) return handleFetchError(error.value);

    adminRooms.value = data.value;

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

  const findByCode = async (
    roomCode: string
  ): Promise<RoomWithUsersType | boolean> => {
    const { data } = await useFetch<RoomWithUsersType>(
      config.public.api_base + roomRoutes.findByCode.uri(roomCode),
      {
        method: roomRoutes.findByCode.method,
      }
    );
    if (null === data.value) return false;

    return data.value;
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
    findAllAdmin().then();

    return true;
  };

  const join = async (roomCode: string): Promise<boolean> => {
    if (!userStore.isLogged) {
      toastStore.push(
        ToastType.WARNING,
        "Vous n'êtes pas connecté, vous ne pouvez pas rejoindre la partie"
      );
      return false;
    }
    const { data, error } = await useAuthFetch(roomRoutes.join.uri(roomCode), {
      method: roomRoutes.join.method,
    });
    if (null === data.value) handleFetchError(error.value);

    toastStore.push(ToastType.INFO, 'Vous avez rejoint le salon');
    findUserRooms().then();

    return true;
  };

  const leave = async (roomCode: string): Promise<boolean> => {
    if (!userStore.isLogged) {
      toastStore.push(
        ToastType.WARNING,
        "Vous n'êtes pas connecté, vous ne pouvez pas rejoindre la partie"
      );
      return false;
    }
    const { data, error } = await useAuthFetch(roomRoutes.leave.uri(roomCode), {
      method: roomRoutes.leave.method,
    });
    if (null === data.value) handleFetchError(error.value);

    toastStore.push(ToastType.INFO, 'Vous avez quitté le salon');
    findUserRooms().then();

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
    adminRooms,
    getRoomState,
    userOwnsTheRoom,
    findAll,
    findAllAdmin,
    findUserRooms,
    findByCode,
    create,
    deleteRoom,
    join,
    leave,
    refreshRooms,
    resetUserRooms,
  };
});
