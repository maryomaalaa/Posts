<template>
  <Button
    :type="type"
    :class="[
      'px-4 py-2 text-sm rounded cursor-pointer inline-block transition-colors',
      variantClass,
      { 'cursor-not-allowed bg-gray-300 text-gray-600': isDisabled }
    ]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot></slot>
</Button>
</template>

<script setup lang="ts">

import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['click']);

const handleClick = (event: MouseEvent) => {
  if (!props.isDisabled) {
    emits('click', event);
  }
};

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-blue-500 text-white hover:bg-blue-700';
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-700';
    default:
      return '';
  }
});
</script>
