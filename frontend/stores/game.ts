import { defineStore } from 'pinia';
import { GameDefinitionType } from '~/typings/game.type';
import { ResultType } from '~/typings/auth.type';

const gameRoutes = {
  findAllDefinitions: {
    method: 'get',
    uri: '/games/definitions',
  },
  findAllDefinitionsHasAdmin: {
    method: 'get',
    uri: `/games/definitions/all`,
  },
};

export const useGameStore = defineStore('game', () => {
  const definitions = ref([] as GameDefinitionType[]);
  const adminDefinitions = ref([] as GameDefinitionType[]);

  const defaultDefinition = computed(() => {
    if (definitions.value.length === 0) return null;

    return definitions.value[0];
  });

  const getDefinitionName = computed(() => (slug: string) => {
    return definitions.value.find((def) => def.slug === slug)?.name ?? slug;
  });

  const findAllDefinitions = async (): Promise<ResultType> => {
    const config = useRuntimeConfig();
    const { data, error } = await useFetch<GameDefinitionType[]>(
      config.public.api_base + gameRoutes.findAllDefinitions.uri,
      {
        method: gameRoutes.findAllDefinitions.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    definitions.value = data.value;

    return {
      hasSucceeded: true,
      data: { status: 0, messages: [] },
    };
  };

  const findAllDefinitionsHasAdmin = async () => {
    const userStore = useUserStore();
    if (!userStore.isAdmin) {
      return {
        hasSucceeded: false,
        data: { status: 0, messages: [] },
      };
    }

    const { data, error } = await useAuthFetch(
      gameRoutes.findAllDefinitionsHasAdmin.uri,
      {
        method: gameRoutes.findAllDefinitionsHasAdmin.method,
      }
    );
    if (null === data.value) return handleFetchError(error.value);

    adminDefinitions.value = data.value;

    return {
      hasSucceeded: true,
      data: { status: 0, messages: [] },
    };
  };

  const resetAdminGameDefinitions = () => {
    adminDefinitions.value = [];
  };

  return {
    definitions,
    adminDefinitions,
    defaultDefinition,
    getDefinitionName,
    findAllDefinitions,
    findAllDefinitionsHasAdmin,
    resetAdminGameDefinitions,
  };
});
