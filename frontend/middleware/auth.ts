export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  if (
    !authStore.isAuthenticated &&
    (to.path.startsWith('/users/me') || to.path.startsWith('/auth/logout'))
  ) {
    return navigateTo('/auth/login');
  }

  if (
    authStore.isAuthenticated &&
    (to.path.startsWith('/auth/login') || to.path.startsWith('/auth/register'))
  ) {
    return navigateTo('/');
  }

  if (!authStore.isAdmin && to.path.startsWith('/admin')) {
    return navigateTo('/');
  }
});
