<template>
  <Label :class="['block font-bold', sizeClass]">
    <slot></slot>
  </Label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'medium', // default size
    validator: (value: string) => ['small', 'medium', 'large'].includes(value)
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'text-base'; // 1rem (16px)
    case 'medium':
      return 'text-xl'; // 1.5rem (24px)
    case 'large':
      return 'text-2xl'; // 2rem (32px)
    default:
      return 'text-xl'; // 1.5rem (24px)
  }
});
</script>
