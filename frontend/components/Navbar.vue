<template>
  <nav class="navbar">
    <div class="navbar-start flex gap-4">
      <NuxtLink to="/" class="btn btn-ghost gap-2">
        <Icon name="logos:partytown-icon" size="2rem" />
        <h1 class="tracking-wider text-accent">polygame</h1>
      </NuxtLink>
    </div>

    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" alt="profile image" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-accent rounded-box w-52"
        >
          <li>
            <NuxtLink
              to="/users/me"
              class="text-accent-content hover:bg-accent-focus"
            >
              Profil
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="text-accent-content hover:bg-accent-focus">
              Se déconnecter
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
