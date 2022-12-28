<template>
  <div class="h-full flex flex-col items-stretch">
    <header class="bg-neutral shadow-md">
      <Navbar />
    </header>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <footer class="footer footer-center py-2 bg-neutral z-10">
      <div class="items-center grid-flow-col text-neutral-content">
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
