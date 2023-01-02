import { defineStore } from 'pinia';
import {
  GameDefinitionAdminType,
  GameDefinitionType,
} from '~/typings/game.type';
import { Ref } from 'vue';

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
  const definitions: Ref<GameDefinitionType[]> = ref([]);
  const adminDefinitions: Ref<GameDefinitionAdminType[]> = ref([]);

  const config = useRuntimeConfig();
  const userStore = useUserStore();

  const defaultDefinition = computed(() => {
    if (definitions.value.length === 0) return null;

    return definitions.value[0];
  });

  const getDefinition = computed(
    () =>
      (slug: string): GameDefinitionType | null => {
        return definitions.value.find((def) => def.slug === slug) ?? null;
      }
  );

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

  const resetAdminGameDefinitions = () => {
    adminDefinitions.value = [];
  };

  return {
    definitions,
    adminDefinitions,
    defaultDefinition,
    getDefinition,
    findAllDefinitions,
    findAllDefinitionsHasAdmin,
    resetAdminGameDefinitions,
  };
});
