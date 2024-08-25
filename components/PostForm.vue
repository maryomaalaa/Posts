<template>
  <div class="flex flex-col items-center justify-start min-h-[80vh] pt-10">
    <Label size="large" class="text-2xl font-bold mb-4">
      {{ $t("createNewPostTitle") }}
    </Label>
    <div class="w-full max-w-md bg-white p-5 rounded-lg shadow-md">
      <div class="mb-4">
        <Label
          size="medium"
          for="name"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t("yourNameLabel") }}
        </Label>
        <input
          type="text"
          id="name"
          v-model="localName"
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="mb-4">
        <Label
          size="medium"
          for="title"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t("titleLabel") }}
        </Label>
        <input
          type="text"
          id="title"
          v-model="localTitle"
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="mb-4">
        <Label
          size="medium"
          for="content"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t("contentLabel") }}
        </Label>
        <textarea
          id="content"
          v-model="localBody"
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
          rows="5"
        ></textarea>
      </div>
      <div class="flex justify-between">
        <CustomButton
          type="submit"
          @click="handleSubmit"
          class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
        >
          {{ $t("savePostButton") }}
        </CustomButton>
        <CustomButton
          type="button"
          @click="goBack"
          class="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700"
        >
          Back to main page
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defineEmits } from "vue";
import { useRouter } from "vue-router";

import { Label } from "radix-vue";
import i18next from "i18next";
import PostService from "@/services/PostService"; // Ensure this is correctly pointing to your service file

const emits = defineEmits(["savePost"]);
const router = useRouter(); // Import Vue Router

const localName = ref("");
const localTitle = ref("");
const localBody = ref("");

const handleSubmit = async () => {
  if (!localName.value.trim()) {
    alert(i18next.t("Please enter your name"));
    return;
  }
  if (!localTitle.value.trim()) {
    alert(i18next.t("Please enter a title for the post"));
    return;
  }
  if (!localBody.value.trim()) {
    alert(i18next.t("Please enter your post content"));
    return;
  }

  const newPost = {
    name: localName.value,
    title: localTitle.value,
    content: localBody.value,
    userId: 1, // Assuming a default user ID, adjust as needed
  };

  try {
    const response = await PostService.createPost(newPost);
    console.log("Post created:", response.data);

    emits("savePost", {
      name: localName.value,
      title: localTitle.value,
      content: localBody.value,
    });

    // Optionally reset the form after submission
    localName.value = "";
    localTitle.value = "";
    localBody.value = "";

    // Redirect to the index page after successfully saving the post
    router.push("/");
  } catch (error) {
    console.error("Failed to save the post:", error);
    // Optionally, show an error message here
  }
};

const goBack = () => {
  router.push("/"); // Redirect to the index page
};
</script>
