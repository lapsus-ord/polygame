import { defineStore } from 'pinia';
import {
  CreateDefinitionDto,
  GameDefinitionAdminType,
  GameDefinitionType,
  UpdateDefinitionDto,
} from '~/typings/game.type';
import { Ref } from 'vue';

const gameRoutes = {
  findAllDefinitions: {
    method: 'GET',
    uri: '/games/definitions',
  },
  findAllDefinitionsHasAdmin: {
    method: 'GET',
    uri: `/games/definitions/all`,
  },
  createDefinition: {
    method: 'POST',
    uri: '/games/definitions',
  },
  patchDefinition: {
    method: 'PATCH',
    uri: (slug: string) => `/games/definitions/${slug}`,
  },
  deleteDefinition: {
    method: 'DELETE',
    uri: (slug: string) => `/games/definitions/${slug}`,
  },
};

export const useGameStore = defineStore('game', () => {
  const definitions: Ref<GameDefinitionType[]> = ref([]);
  const adminDefinitions: Ref<GameDefinitionAdminType[]> = ref([]);

  const config = useRuntimeConfig();
  const userStore = useUserStore();
  const toastStore = useToastStore();

  const defaultDefinition = computed((): GameDefinitionType | null => {
    if (definitions.value.length === 0) return null;

    return sortedDefinitions.value[0];
  });

  const sortedDefinitions = computed((): GameDefinitionType[] => {
    return definitions.value.sort((a, b) => a.slug.localeCompare(b.slug));
  });

  const sortedAdminDefinitions = computed((): GameDefinitionAdminType[] => {
    return adminDefinitions.value.sort((a, b) => a.slug.localeCompare(b.slug));
  });

  const getDefinition = computed(() => (slug: string) => {
    return definitions.value.find((def) => def.slug === slug) ?? null;
  });

  const findAllDefinitions = async (): Promise<boolean> => {
    const { data, error } = await useFetch<GameDefinitionType[]>(
      config.public.api_base + gameRoutes.findAllDefinitions.uri,
      {
        method: gameRoutes.findAllDefinitions.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    definitions.value = data.value;

    return true;
  };

  const findAllDefinitionsHasAdmin = async (): Promise<boolean> => {
    if (!userStore.isAdmin) return false;

    const { data, error } = await useAuthFetch(
      gameRoutes.findAllDefinitionsHasAdmin.uri,
      {
        method: gameRoutes.findAllDefinitionsHasAdmin.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    adminDefinitions.value = data.value;

    return true;
  };

  const createDefinition = async (
    dto: CreateDefinitionDto
  ): Promise<boolean> => {
    if (!userStore.isAdmin) return false;

    const { data, error } = await useAuthFetch(
      gameRoutes.createDefinition.uri,
      {
        method: gameRoutes.createDefinition.method,
        body: dto,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    toastStore.push(ToastType.SUCCESS, `Jeu '${dto.slug}' créé avec succès !`);
    findAllDefinitionsHasAdmin().then();

    return true;
  };

  const patchDefinition = async (
    oldSlug: string,
    dto: UpdateDefinitionDto
  ): Promise<boolean> => {
    if (!userStore.isAdmin) return false;

    const { data, error } = await useAuthFetch(
      gameRoutes.patchDefinition.uri(oldSlug),
      {
        method: gameRoutes.patchDefinition.method,
        body: dto,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    toastStore.push(
      ToastType.SUCCESS,
      `Jeu '${data.value.slug}' modifié avec succès !`
    );
    findAllDefinitionsHasAdmin().then();

    return true;
  };

  const deleteDefinition = async (slug: string): Promise<boolean> => {
    if (!userStore.isAdmin) return false;

    const { data, error } = await useAuthFetch(
      gameRoutes.deleteDefinition.uri(slug),
      {
        method: gameRoutes.deleteDefinition.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    toastStore.push(
      ToastType.SUCCESS,
      `Jeu '${data.value.slug}' supprimé avec succès !`
    );
    findAllDefinitionsHasAdmin().then();

    return true;
  };

  const resetAdminGameDefinitions = () => {
    adminDefinitions.value = [];
  };

  return {
    definitions,
    adminDefinitions,
    defaultDefinition,
    sortedDefinitions,
    sortedAdminDefinitions,
    getDefinition,
    findAllDefinitions,
    findAllDefinitionsHasAdmin,
    createDefinition,
    patchDefinition,
    deleteDefinition,
    resetAdminGameDefinitions,
  };
});
