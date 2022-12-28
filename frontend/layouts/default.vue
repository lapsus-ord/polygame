<template>
  <div class="h-full flex flex-col">
    <header class="bg-base-100 border-b-base-200 border-b shadow-md mb-6">
      <UiNavbar project-name="Polygame" />
    </header>

    <main class="flex-grow container mx-auto px-4">
      <slot />
    </main>

    <footer
      class="footer footer-center py-4 mt-6 bg-neutral text-neutral-content"
    >
      <div class="items-center grid-flow-col">
        <Icon name="logos:partytown-icon" size="20px" />
        <p>
          Made with <Icon name="mdi:cards-heart" /> by
          <a class="link" href="https://github.com/lapsus-ord" target="_blank">
            Lapsus
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>
