<template>
  <div class="h-full flex flex-col">
    <div class="grow flex flex-col">
      <ChatBubble
        v-for="message in messages"
        :key="message.username"
        :message="message"
      />
    </div>
    <form class="w-full flex" autocomplete="off" @submit.prevent="sendMessage">
      <textarea
        v-model.trim="inputMessage"
        rows="1"
        style="resize: none"
        placeholder="Envoyer un message"
        class="grow textarea textarea-bordered rounded-r-none"
        @keyup="handleReturnKey"
      />
      <button
        type="submit"
        class="input input-bordered border-l-0 rounded-l-none"
      >
        <Icon name="carbon:send-alt-filled" size="1.5rem" />
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const messages = ref([
  {
    username: 'Obi-Wan Kenobi',
    date: Date.now(),
    content: 'You were the Chosen One!',
    isAdmin: false,
    ownership: false,
  },
  {
    username: 'Anakin',
    date: Date.now(),
    content: 'I hate you!',
    isAdmin: false,
    ownership: false,
  },
]);
const inputMessage = ref('');

const sendMessage = () => {
  if ('' === inputMessage.value) return;

  messages.value.push({
    username: 'moi',
    date: Date.now(),
    content: inputMessage.value,
    isAdmin: false,
    ownership: true,
  });
  inputMessage.value = '';
};

const handleReturnKey = (e: KeyboardEvent) => {
  if (e.getModifierState('Shift') || 'Enter' !== e.key) return;

  sendMessage();
};
</script>
