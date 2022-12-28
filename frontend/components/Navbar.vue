<template>
  <nav class="navbar sm:px-8">
    <div class="navbar-start flex gap-4">
      <NuxtLink to="/" class="btn btn-ghost gap-2">
        <Icon name="logos:partytown-icon" size="42px" />
        <h1 class="hidden sm:block tracking-wider text-3xl">
          <span id="header-1st">poly</span>
          <span id="header-2nd">game</span>
        </h1>
      </NuxtLink>
    </div>

    <NavbarMenu class="navbar-end" />
  </nav>
</template>

<style scoped>
#header-1st {
  color: #21c1ff;
}

#header-2nd {
  color: #ffb86b;
}
</style>
