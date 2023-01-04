import { defineStore } from 'pinia';
import { Ref } from 'vue';
import jwtDecode from 'jwt-decode';
import { JwtDataType, TokensType } from '~/typings/auth.type';
import { handleFetchError } from '~/utils/handleFetchError';

const authRoutes = {
  login: {
    method: 'POST',
    uri: '/auth/login',
  },
  register: {
    method: 'POST',
    uri: '/auth/register',
  },
  logout: {
    method: 'GET',
    uri: '/auth/logout',
  },
  refresh: {
    method: 'GET',
    uri: '/auth/refresh',
  },
};

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken: Ref<string | null> = ref(null);
    const refreshToken: Ref<string | null> = ref(null);

    const config = useRuntimeConfig();
    const userStore = useUserStore();

    const isAuthenticated = computed(() => {
      let refreshTokenHasExpired = false;
      if (null !== refreshToken.value)
        refreshTokenHasExpired =
          jwtDecode<JwtDataType>(refreshToken.value).exp <
          Math.floor(Date.now() / 1000);

      // When refresh token expires → remove all auth info
      if (refreshTokenHasExpired) reset();

      return null !== refreshToken.value && !refreshTokenHasExpired;
    });

    const decodedToken = computed(() => {
      return accessToken.value
        ? jwtDecode<JwtDataType>(accessToken.value)
        : null;
    });

    const accessTokenHasExpired = computed(() => {
      return (
        null === decodedToken.value ||
        decodedToken.value.exp < Math.floor(Date.now() / 1000)
      );
    });

    const init = (newAccessToken: string, newRefreshToken: string) => {
      accessToken.value = newAccessToken;
      refreshToken.value = newRefreshToken;
      userStore.init(jwtDecode<JwtDataType>(accessToken.value));
    };

    const login = async (
      username: string,
      password: string
    ): Promise<boolean> => {
      const { data, error } = await useFetch<TokensType>(
        config.public.api_base + authRoutes.login.uri,
        {
          method: authRoutes.login.method,
          body: {
            username: username,
            password: password,
          },
        }
      );
      if (null === data.value) return handleFetchError(error.value);

      init(data.value.access_token, data.value.refresh_token);

      return true;
    };

    const register = async (
      username: string,
      password: string
    ): Promise<boolean> => {
      const { data, error } = await useFetch<TokensType>(
        config.public.api_base + authRoutes.register.uri,
        {
          method: authRoutes.register.method,
          body: {
            username: username,
            password: password,
          },
        }
      );
      if (null === data.value) return handleFetchError(error.value);

      init(data.value.access_token, data.value.refresh_token);

      return true;
    };

    const logout = () => {
      useAuthFetch(authRoutes.logout.uri, {
        method: authRoutes.logout.method,
      }).then(() => reset());
    };

    const reset = () => {
      accessToken.value = null;
      refreshToken.value = null;
      userStore.reset();
    };

    return {
      accessToken,
      refreshToken,
      isAuthenticated,
      decodedToken,
      accessTokenHasExpired,
      init,
      login,
      register,
      logout,
      reset,
    };
  },
  { persist: { paths: ['refreshToken'] } }
);
