<template>
  <div class="relative p-5 border-2 border-gray-300 rounded-lg bg-white shadow-md">
    <div>
      <h2 class="text-xl font-bold mb-2">{{ title }}</h2>
    </div>
    <div>
      <p class="mb-2">{{ body }}</p>
    </div>
    <div class="flex flex-col items-start">
      <p class="font-bold mb-1">
        Posted by &nbsp;<span class="text-blue-600 font-bold">{{ author }}</span>
      </p>
      <div class="flex gap-2 mt-2">
        <CustomButton
          @click="handleDelete"
          :isDisabled="loading"
          variant="danger"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          {{ loading ? 'Deleting...' : 'Delete' }}
        </CustomButton>
        <CustomButton
          @click="viewDetails"
          variant="primary"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          View Details
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: String,
  body: String,
  author: String,
  postId: Number,
  loading: Boolean,
});

const emits = defineEmits(['delete', 'view']);

const handleDelete = () => {
  emits('delete', props.postId);
};

const viewDetails = () => {
  emits('view', props.postId);
};
</script>
