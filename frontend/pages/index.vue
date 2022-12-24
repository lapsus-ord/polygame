<template>
  <div>
    <div class="hero bg-base-200 py-10">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello, world!</h1>
          <p>Api url: {{ api_base }}</p>
          <p class="py-6">{{ $colorMode }}</p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    <div class="p-10">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { api_base } = useRuntimeConfig().public;
</script>

<style scoped></style>
