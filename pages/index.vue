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
          English
        </button>
        <button
          @click="changeLanguage('ar')"
          class="px-3 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
        >
          Arabic
        </button>
      </div>
    </div>

    <h1 class="text-center mb-5 text-2xl font-bold">{{ $t("pageTitle") }}</h1>
    <div class="flex justify-center mb-5">
      <ThemeToggle @updateTheme="toggleState = $event" />
    </div>
    <div class="flex justify-center mb-5">
      <CustomButton
        @click="createPost"
        variant="success"
        class="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
      >
        {{ $t("createPostButton") }}
      </CustomButton>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :body="post.body"
        :author="getUserName(post.userId)"
        :postId="post.id"
        :loading="loading[post.id]"
        @delete="handleDelete"
        @view="goToPost"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { postRepo } from "~/repositories/postRepo";
import i18next from "i18next";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
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
    posts.value = await postRepo.getPosts();

    if (route.query.newPost) {
      const newPost = JSON.parse(route.query.newPost as string);
      posts.value.unshift(newPost); // Add the new post to the top of the list
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
};

const fetchUsers = async () => {
  try {
    const userResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    users.value = await userResponse.json();
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

function changeLanguage(lang) {
  i18next.changeLanguage(lang, () => {
    console.log(`Language changed to ${lang}`);
  });
}

onMounted(() => {
  fetchPosts();
  fetchUsers();
});

watch(
  () => route.query.refresh,
  async () => {
    await fetchPosts();
  }
);

const getUserName = (userId: number) => {
  const user = users.value.find((user) => user.id === userId);
  return user ? user.name : "Unknown";
};

const createPost = () => {
  console.log("Create Post button clicked");
  router.push("/create");
};

const goToPost = (id: number) => {
  console.log("View Details button clicked for post ID:", id);
  router.push(`/posts/${id}`);
};

const handleDelete = async (postId: number) => {
  console.log("Delete button clicked for post ID:", postId);
  if (confirm(i18next.t("deleteConfirmation"))) {
    loading.value[postId] = true;

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        posts.value = posts.value.filter((post) => post.id !== postId);
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      loading.value[postId] = false;
    }
  }
};
</script>
