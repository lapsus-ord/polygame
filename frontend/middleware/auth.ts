export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  if (
    !userStore.isLogged &&
    (to.path.startsWith('/users/me') || to.path.startsWith('/auth/logout'))
  ) {
    return navigateTo('/auth/login');
  }

  if (
    userStore.isLogged &&
    (to.path.startsWith('/auth/login') || to.path.startsWith('/auth/register'))
  ) {
    return navigateTo('/');
  }

  if (!userStore.isAdmin && to.path.startsWith('/admin')) {
    return navigateTo('/');
  }
});
