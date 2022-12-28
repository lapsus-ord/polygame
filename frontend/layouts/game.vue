<template>
  <main class="grow bg-base-100 z-10">
    <div class="flex h-full">
      <div class="bg-base-100 grow basis-3/4 p-4">
        <slot />
      </div>

      <GameToolbar class="basis-1/4 flex flex-col" />
    </div>
  </main>
</template>
