<template>
  postId {{ postId }}
  <CommentForm :postId="postId" @submitComment="submitComment" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import CommentService from "@/services/CommentService";

const route = useRoute();
const router = useRouter();

const postId = route.params.id;

const submitComment = async (commentData: {
  postId: number;
  name: string;
  email: string;
  content: string;
}) => {
  try {
    await CommentService.addComment(commentData);
    router.push(`/posts/${postId}`);
  } catch (error) {
    console.error(
      "Failed to add comment",
      error.response || error.message || error
    );
  }
};
</script>
