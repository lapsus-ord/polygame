<template>
  <div>
    <label class="rocker rocker-small">
      <input type="checkbox" checked />
      <span class="switch-left">{{ leftSwitch }}</span>
      <span class="switch-right">{{ rightSwitch }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  leftSwitch: string;
  rightSwitch: string;
}>();
</script>

<style scoped>
/* --- Rocket checkbox --- */
/* source: https://uiverse.io/bandirevanth/wonderful-dog-56 */
.rocker {
  display: inline-block;
  position: relative;

  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #888;
  width: 7rem;
  height: 4rem;
  overflow: hidden;
  border-bottom: 0.5em solid #eee;
}

.rocker-small {
  font-size: 0.75rem;
  /* Sizes the switch */
  margin: 1rem;
}

.rocker::before {
  content: '';
  position: absolute;
  top: 0.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  border: 0.5em solid #eee;
  border-bottom: 0;
}

.rocker input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-left,
.switch-right {
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 3rem;
  transition: 0.2s;
  user-select: none;
}

.switch-left {
  height: 2.4rem;
  width: 2.75rem;
  left: 0.85rem;
  bottom: 0.4rem;
  background-color: #ddd;
  transform: rotate(15deg) skewX(15deg);
}

.switch-right {
  right: 0.5rem;
  bottom: 0;
  background-color: #bd5757;
  color: #fff;
}

.switch-left::before,
.switch-right::before {
  content: '';
  position: absolute;
  width: 0.4rem;
  height: 2.45rem;
  bottom: -0.45rem;
  background-color: #ccc;
  transform: skewY(-65deg);
}

.switch-left::before {
  left: -0.4rem;
}

.switch-right::before {
  right: -0.375rem;
  background-color: transparent;
  transform: skewY(65deg);
}

input:checked + .switch-left {
  background-color: #0084d0;
  color: #fff;
  bottom: 0;
  left: 0.5rem;
  height: 2.5rem;
  width: 3rem;
  transform: rotate(0deg) skewX(0deg);
}

input:checked + .switch-left::before {
  background-color: transparent;
  width: 3.0833rem;
}

input:checked + .switch-left + .switch-right {
  background-color: #ddd;
  color: #888;
  bottom: 0.4rem;
  right: 0.8rem;
  height: 2.4rem;
  width: 2.75rem;
  transform: rotate(-15deg) skewX(-15deg);
}

input:checked + .switch-left + .switch-right::before {
  background-color: #ccc;
}

/* Keyboard Users */
input:focus + .switch-left {
  color: #333;
}

input:checked:focus + .switch-left {
  color: #fff;
}

input:focus + .switch-left + .switch-right {
  color: #fff;
}

input:checked:focus + .switch-left + .switch-right {
  color: #333;
}
</style>
