<template>
    <button
      :type="type"
      :class="['custom-button', variant, { disabled: isDisabled }]"
      :disabled="isDisabled"
      @click="handleClick"
    >
      <slot></slot>
    </button>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'primary' 
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  });
  
  const emits = defineEmits(['click']);
  
  const handleClick = (event: MouseEvent) => {
    if (!props.isDisabled) {
      emits('click', event);
    }
  };
  </script>
  
  <style scoped>
  .custom-button {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    display: inline-block;
    transition: background-color 0.3s;
  }
  
  .primary {
    background-color: #007bff;
    color: white;
  }
  
  .primary:hover {
    background-color: #0056b3;
  }
  
  .danger {
    background-color: #dc3545;
    color: white;
  }
  
  .danger:hover {
    background-color: #c82333;
  }
  
  .disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
  </style>
  