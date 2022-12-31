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
      if (authStore.accessTokenHasExpired) await refreshTokens();

      const bearer = authStore.accessToken
        ? `Bearer ${authStore.accessToken}`
        : '';

      options.headers = {
        ...options.headers,
        Authorization: bearer,
      };
    },
  });
};

const refreshTokens = async () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const bearer = authStore.refreshToken
    ? `Bearer ${authStore.refreshToken}`
    : '';

  const { data, error } = await useFetch<TokensType>(
    `${config.public.api_base}/auth/refresh`,
    {
      method: 'get',
      headers: { Authorization: bearer },
    }
  );
  if (null === data.value) {
    authStore.reset();
    return error.value;
  }

  authStore.init(data.value.access_token, data.value.refresh_token);
};
