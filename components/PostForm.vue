<template>
  <div class="flex flex-col items-center justify-start min-h-[80vh] pt-10">
    <Label size="large" class="text-2xl font-bold mb-4"
      >Create a New Post</Label
    >
    <div class="w-full max-w-md bg-white p-5 rounded-lg shadow-md">
      <!-- Name Input with Label -->
      <div class="mb-4">
        <Label
          size="medium"
          for="name"
          class="block text-sm font-medium text-gray-700"
        >
          Your Name
        </Label>
        <input
          type="text"
          id="name"
          v-model="localName"
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <!-- Title Input with Label -->
      <div class="mb-4">
        <Label
          size="medium"
          for="title"
          class="block text-sm font-medium text-gray-700"
        >
          Title
        </Label>
        <input
          type="text"
          id="title"
          v-model="localTitle"
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <!-- Content Textarea with Label -->
      <div class="mb-4">
        <Label
          size="medium"
          for="content"
          class="block text-sm font-medium text-gray-700"
        >
          Content
        </Label>
        <textarea
          id="content"
          v-model="localBody"
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
          rows="5"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <CustomButton
        type="submit"
        @click="handleSubmit"
        class="block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 mx-auto"
      >
        Save Post
      </CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defineEmits } from "vue";
import { Label } from "radix-vue";

const emits = defineEmits(["savePost"]);

const localName = ref("");
const localTitle = ref("");
const localBody = ref("");

const handleSubmit = () => {
  if (!localName.value.trim()) {
    alert("Please enter your name.");
    return;
  }
  if (!localTitle.value.trim()) {
    alert("Please enter a title.");
    return;
  }
  if (!localBody.value.trim()) {
    alert("Please enter the content.");
    return;
  }

  // Emit the savePost event with the form data
  emits("savePost", {
    name: localName.value,
    title: localTitle.value,
    body: localBody.value,
  });
};
</script>
