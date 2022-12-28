<template>
  <main class="grow bg-base-100 z-10">
    <div class="flex h-full">
      <div class="bg-base-100 grow basis-3/4 p-4">
        <slot />
      </div>

      <aside class="basis-1/4 flex flex-col">
        <div class="basis-1/3 flex flex-col">
          <h1 class="bg-primary p-2">Configuration&nbsp;:</h1>
          <p class="grow border-x-2 border-primary border-dashed p-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
            autem cumque eius excepturi fugiat incidunt itaque maxime saepe sint
            tempore?
          </p>
        </div>
        <div class="basis-2/3 flex flex-col">
          <h1 class="bg-secondary p-2">Chatroom&nbsp;:</h1>
          <div class="grow border-x-2 border-secondary border-dashed p-2">
            <ChatRoom />
          </div>
        </div>
      </aside>
    </div>
  </main>
</template>

<style>
body {
  background: none;
}
</style>
