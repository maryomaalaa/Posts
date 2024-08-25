<template>
  <div
    :class="
      toggleState
        ? 'dark bg-gray-900 text-gray-200'
        : 'light bg-white text-black'
    "
  >
    <div class="flex justify-between items-center p-4">
      <div>
        <p class="text-lg">{{ $t("welcome") }}</p>
      </div>
      <div class="flex gap-4">
        <button
          @click="changeLanguage('en')"
          class="px-3 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
        >
          {{ $t("ENGlanguage") }}
        </button>
        <button
          @click="changeLanguage('ar')"
          class="px-3 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
        >
          {{ $t("ARlanguage") }}
        </button>
      </div>
    </div>

    <h1 class="text-center mb-5 text-2xl font-bold">{{ $t("pageTitle") }}</h1>
    <div class="flex justify-center mb-5 relative">
      <ThemeToggle @updateTheme="toggleState = $event" />
    </div>

    <div class="relative flex justify-center flex-col items-center mb-5">
      <CustomButton
        @click="createPost"
        variant="success"
        class="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center mb-4"
      >
        {{ $t("createPostButton") }}
      </CustomButton>
      <div class="w-full p-4 bg-yellow-300 text-black text-center z-40">
        {{ $t("chatbotInfo") }}
      </div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5 mt-10"
    >
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :body="post.body"
        :author="post.author"
        :postId="post.id"
        :loading="loading[post.id]"
        @delete="handleDelete"
        @view="goToPost"
        @addComment="addComment"
      />
    </div>

    <div class="mt-10">
      <ChatBot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import ChatBot from "~/components/ChatBot.vue";
import i18next from "i18next";
import PostService from "@/services/PostService"; // Import your PostService for the API calls

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  author: string;
}

interface User {
  id: number;
  name: string;
}

const posts = ref<Post[]>([]);
const users = ref<User[]>([]);
const loading = ref<Record<number, boolean>>({});
const toggleState = ref(false);
const router = useRouter();
const route = useRoute();

const fetchPosts = async () => {
  try {
    const response = await PostService.getPostSummaries();
    posts.value = response.data.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.content,
      author: post.name,
      userId: post.userId,
    }));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};

onMounted(() => {
  fetchPosts();
});

watch(
  () => route.query.refresh,
  async () => {
    await fetchPosts();
  }
);

function changeLanguage(lang) {
  i18next.changeLanguage(lang, () => {});
}

const createPost = () => {
  router.push("/create");
};

const goToPost = (id: number) => {
  router.push(`/posts/${id}`);
};

const addComment = (postId: number) => {
  router.push(`/posts/${postId}/AddComment`);
};

const handleDelete = (postId) => {
  posts.value = posts.value.filter((post) => post.id !== postId);
};
</script>
