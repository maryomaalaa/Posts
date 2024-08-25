<template>
  <PostForm @savePost="savePost" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const savePost = async ({ name, title, body }) => {
  const newPost = {
    title,
    body,
    userId: 1,
  };

  try {
    // Send a POST request to your .NET backend to save the new post
    const response = await axios.post(
      "http://localhost:5001/api/posts",
      newPost
    );
    console.log("Post created:", response.data);

    // After the post is created, redirect to the homepage
    router.push({
      path: "/",
      query: {
        refresh: Date.now(),
        newPost: JSON.stringify(response.data),
      },
    });
  } catch (error) {
    console.error("Failed to save the post:", error);
  }
};
</script>
