  <template>
    <label :class="['label', sizeClass]">
      <slot></slot>
    </label>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    size: {
      type: String,
      default: 'medium', // default size
      validator: value => ['small', 'medium', 'large'].includes(value)
    }
  });
  
  const sizeClass = computed(() => {
    switch (props.size) {
      case 'small':
        return 'text-small';
      case 'medium':
        return 'text-medium';
      case 'large':
        return 'text-large';
      default:
        return 'text-medium';
    }
  });
  </script>
  
  <style scoped>
  .label {
    display: block;
    font-weight: bold;
  }
  
  .text-small {
    font-size: 1rem;
  }
  
  .text-medium {
    font-size: 1.5rem;
  }
  
  .text-large {
    font-size: 2rem;
  }
  </style>
  