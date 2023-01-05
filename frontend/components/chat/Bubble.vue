<template>
  <div :class="`chat ${message.ownership ? 'chat-end' : 'chat-start'}`">
    <div class="chat-header">
      {{ message.username }}
      <time class="text-xs opacity-50">{{ `${hours}:${minutes}` }}</time>
    </div>
    <div
      :class="`chat-bubble whitespace-pre-wrap break-all ${
        message.isAdmin ? 'chat-bubble-warning' : ''
      }`"
    >
      {{ message.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: {
    username: string;
    date: number;
    content: string;
    isAdmin: boolean;
    ownership: boolean;
  };
}>();

const date = new Date(props.message.date);
const hours = date.getHours();
const minutes = date.getMinutes();
</script>
