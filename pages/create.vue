<template>
  <PostForm @savePost="savePost" />
</template>

<script setup lang="ts">
import i18next from "i18next";
import { useRouter } from "vue-router";
import { postRepo } from "~/repositories/postRepo";

const router = useRouter();

const savePost = async ({ name, title, body }) => {
  if (!name || !title || !body) {
    alert(i18next.t("fillInAllFieldsAlert")); // Using the translation for the alert message
    return;
  }

  const newPost = {
    title,
    body,
    userId: 1,
  };

  const createdPost = await postRepo.createPost(newPost);

  router.push({
    path: "/",
    query: {
      refresh: Date.now(),
      newPost: JSON.stringify(createdPost),
    },
  });
};
</script>
