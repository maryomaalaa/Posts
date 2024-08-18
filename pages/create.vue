<template>
    <!-- Use PostForm Component -->
    <PostForm @savePost="savePost" />
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';
import { postRepo } from '~/repositories/postRepo';

const router = useRouter();

const savePost = async ({ name, title, body }) => {
  if (!name || !title || !body) {
    alert('Please fill in all fields.');
    return;
  }

  const newPost = {
    title,
    body,
    userId: 1, // Assuming userId is static for now
  };

  try {
    const createdPost = await postRepo.createPost(newPost);
    console.log('Post created:', createdPost);

    // Navigate back to the index page and pass the new post
    router.push({
      path: '/',
      query: {
        refresh: Date.now(),
        newPost: JSON.stringify(createdPost),
      },
    });
  } catch (error) {
    console.error('Failed to save the post:', error);
  }
};

</script>
