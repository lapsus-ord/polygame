<template>
  <div class="h-full flex flex-col">
    <header class="bg-base-100 border-base-content border-b-1 shadow-md">
      <UiNavbar />
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="footer footer-center p-4 bg-neutral text-neutral-content">
      <div class="items-center grid-flow-col">
        <Icon name="logos:partytown-icon" size="36px" />
        <p>
          Made with <Icon name="mdi:cards-heart" size="1.15rem" /> by
          <a class="link" href="https://github.com/lapsus-ord" target="_blank">
            Lapsus
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>
