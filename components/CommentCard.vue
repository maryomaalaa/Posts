<template>
  <div
    class="p-4 border-4 border-grey-500 rounded-lg bg-gray-50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-300"
  >
    <div class="mb-2">
      <strong class="block mb-1 text-lg">{{ name }}</strong>
    </div>
    <div class="mb-2">
      <p class="m-0">{{ body }}</p>
    </div>
    <div>
      <em class="text-gray-500">{{ email }}</em>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  name: String,
  body: String,
  email: String,
});
</script>
