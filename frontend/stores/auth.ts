import { defineStore } from 'pinia';
import { Ref } from 'vue';
import jwtDecode from 'jwt-decode';
import { ResultType, JwtDataType, TokensType } from '~/typings/auth.type';
import { handleFetchError } from '~/utils/handleFetchError';

const authRoutes = {
  login: {
    method: 'post',
    uri: '/auth/login',
  },
  register: {
    method: 'post',
    uri: '/auth/register',
  },
  logout: {
    method: 'get',
    uri: '/auth/logout',
  },
  refresh: {
    method: 'get',
    uri: '/auth/refresh',
  },
};

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken: Ref<string | null> = ref(null);
    const refreshToken: Ref<string | null> = ref(null);

    const isAuthenticated = computed(() => {
      return null !== refreshToken.value;
    });

    const decodedToken = computed(() => {
      return accessToken.value
        ? jwtDecode<JwtDataType>(accessToken.value)
        : null;
    });

    const login = async (
      username: string,
      password: string
    ): Promise<ResultType> => {
      const config = useRuntimeConfig();
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

      return storeUser(data.value);
    };

    const register = async (
      username: string,
      password: string
    ): Promise<ResultType> => {
      const config = useRuntimeConfig();
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

      return storeUser(data.value);
    };

    // Create user object and handle error if any
    const storeUser = (data: TokensType): ResultType => {
      accessToken.value = data.access_token;
      refreshToken.value = data.refresh_token;

      const userStore = useUserStore();
      const userDecoded = jwtDecode<JwtDataType>(data.access_token);
      userStore.init(userDecoded);

      return {
        hasSucceeded: true,
        data: { status: 0, messages: [] },
      };
    };

    const logout = () => {
      const config = useRuntimeConfig();
      useFetch(config.public.api_base + authRoutes.logout.uri, {
        method: authRoutes.logout.method,
        headers: { Authorization: `Bearer ${accessToken.value}` },
      }).then(() => {
        accessToken.value = null;
        refreshToken.value = null;
        useUserStore().reset();
      });
    };

    return {
      accessToken,
      refreshToken,
      isAuthenticated,
      decodedToken,
      login,
      register,
      logout,
    };
  },
  { persist: { paths: ['refreshToken'] } }
);
