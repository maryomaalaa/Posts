<script setup lang="ts">
import { onMounted, ref, watchEffect, defineProps } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'

const props = defineProps({
  value: {
    type: Number,
    required: true
  }
})

const progressValue = ref(0)

watchEffect(() => {
  progressValue.value = props.value
})
</script>

<template>
  <ProgressRoot
    v-model="progressValue"
    class="relative overflow-hidden bg-blackA9 rounded-full w-full sm:w-[300px] h-4 sm:h-5"
    style="transform: translateZ(0)"
  >
    <ProgressIndicator
      class="bg-white rounded-full w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
      :style="`transform: translateX(-${100 - progressValue}%)`"
    />
  </ProgressRoot>
</template>
