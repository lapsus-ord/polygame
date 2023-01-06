import { UseFetchOptions } from '#app';
import { TokensType } from '~/typings/auth.type';

export const useAuthFetch = async (
  url: string,
  options?: UseFetchOptions<never>
) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  return useFetch(config.public.api_base + url, {
    ...options,
    async onRequest({ options }) {
      if (authStore.accessTokenHasExpired) await refreshAccessToken();

      const bearer = authStore.accessToken
        ? `Bearer ${authStore.accessToken}`
        : '';

      options.credentials = 'include';
      options.headers = {
        ...options.headers,
        Authorization: bearer,
      };
    },
  });
};

const refreshAccessToken = async () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const { data, error } = await useFetch<TokensType>(
    `${config.public.api_base}/auth/refresh`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  if (null === data.value) {
    authStore.reset();

    return handleFetchError(error.value);
  }

  authStore.init(data.value.access_token);
};
