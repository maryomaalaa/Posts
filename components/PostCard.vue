<template>
  <div
    class="relative p-5 border-2 border-gray-300 rounded-lg bg-white shadow-md"
  >
    <div>
      <h2 class="text-xl font-bold mb-2">{{ title }}</h2>
    </div>
    <div>
      <p class="mb-2">Author: {{ author }}</p>
    </div>
    <div>
      <p class="mb-2">{{ body }}</p>
    </div>
    <div class="flex flex-col items-start">
      <div class="flex gap-2 mt-2">
        <CustomButton
          @click="confirmDelete"
          :isDisabled="loading"
          variant="danger"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          {{ loading ? $t("deleting") : $t("deleteButton") }}
        </CustomButton>
        <CustomButton
          @click="viewDetails"
          variant="primary"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          {{ $t("viewDetailsButton") }}
        </CustomButton>
        <CustomButton
          @click="addComment"
          variant="primary"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Add Comment
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import PostService from "@/services/PostService";
import i18next from "i18next";
import { useRouter } from "vue-router";

const props = defineProps({
  title: String,
  body: String,
  author: String,
  postId: Number,
  loading: Boolean,
});

const emits = defineEmits(["delete", "view"]);
const router = useRouter();

const confirmDelete = async () => {
  if (confirm(i18next.t("deleteConfirmation"))) {
    handleDelete();
  }
};

const handleDelete = async () => {
  console.log("Delete button clicked");

  try {
    await PostService.deletePost(props.postId);
    emits("delete", props.postId);
    console.log(`Post ${props.postId} deleted successfully`);
  } catch (error) {
    console.error("Failed to delete the post:", error);
  }
};

const viewDetails = () => {
  if (props.postId) {
    router.push(`/posts/${props.postId}`);
  } else {
    console.error("Post ID is missing");
  }
};

const addComment = () => {
  if (props.postId) {
    router.push(`/posts/${props.postId}/AddComment`);
  } else {
    console.error("Post ID is missing");
  }
};
</script>
