<template>
  <div>
    <div v-if="!post">
      <p>Loading post details...</p>
    </div>

    <div v-else>
      <h1 class="text-blue-700 text-2xl font-bold mb-4">{{ post.title }}</h1>

      <p class="mb-2 font-bold">
        <strong>{{ $t("postLabel") }}:&nbsp;</strong> {{ post.body }}
      </p>

      <h2 class="text-xl font-semibold mb-4">{{ $t("commentsTitle") }}</h2>

      <div v-if="comments.length" class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CommentCard
          v-for="comment in comments"
          :key="comment.id"
          :name="comment.name"
          :body="comment.body"
          :email="comment.email"
        />
      </div>

      <p v-else class="text-gray-500">No comments found.</p>

      <CustomButton @click="goBack" variant="primary" class="mt-4">
        {{ $t("backButton") }}
      </CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { postRepo } from "~/repositories/postRepo";
import { commentRepo } from "~/repositories/commentRepo";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const route = useRoute();
const postId = Array.isArray(route.params.id)
  ? parseInt(route.params.id[0], 10)
  : parseInt(route.params.id, 10);
const post = ref<Post | null>(null);
const comments = ref([]);

const fetchPostAndComments = async () => {
  try {
    post.value = await postRepo.getPostById(postId);
    comments.value = await commentRepo.getComments(postId);
  } catch (error) {
    console.error("Failed to load post or comments:", error);
  }
};

onMounted(() => {
  fetchPostAndComments();
});

const router = useRouter();
const goBack = () => {
  router.push("/");
};
</script>
