<template>
    <Toggle
      v-model:pressed="toggleState"
      aria-label="Toggle theme"
      class="hover:bg-green3 text-mauve11 data-[state=on]:bg-green6 data-[state=on]:text-violet12 shadow-blackA7 flex h-[35px] w-[35px] items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
    >
      <Icon
        :icon="toggleState ? 'mdi:weather-night' : 'mdi:weather-sunny'"
        class="w-[15px] h-[15px]"
      />
    </Toggle>
  </template>
  
  <script setup lang="ts">
  import { Toggle } from 'radix-vue';
  import { Icon } from '@iconify/vue';
  import { ref, watch } from 'vue';
  import { defineEmits } from 'vue';
  
  const emits = defineEmits(['updateTheme']);
  
  const toggleState = ref(false);
  
  watch(toggleState, (newState) => {
    emits('updateTheme', newState);
  });
  </script>
  