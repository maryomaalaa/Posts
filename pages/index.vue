<template>
  <div :class="toggleState ? 'dark-theme' : 'light-theme'">
    <h1 class="center-title">All Posts</h1>
    <div class="theme-toggle">
      <ThemeToggle @updateTheme="toggleState = $event" />
    </div>
    <CustomButton @click="createPost" variant="success" class="create-button">
      Create Post
    </CustomButton>
    <div class="posts-container">
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
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ThemeToggle from '~/components/ThemeToggle.vue';
import PostCard from '~/components/PostCard.vue';
import CustomButton from '~/components/CustomButton.vue'; // Import the custom button

const posts = ref([]);
const users = ref([]);
const loading = ref({}); // Object to track loading state for each post
const toggleState = ref(false);
const router = useRouter();
const route = useRoute();

const fetchPosts = async () => {
  try {
    const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    posts.value = await postResponse.json();

    if (route.query.newPost) {
      const newPost = JSON.parse(route.query.newPost);
      posts.value.unshift(newPost);
    }
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
};

const fetchUsers = async () => {
  try {
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await userResponse.json();
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

onMounted(() => {
  fetchPosts();
  fetchUsers();
});

watch(() => route.query.refresh, async () => {
  await fetchPosts();
});

const getUserName = (userId) => {
  const user = users.value.find(user => user.id === userId);
  return user ? user.name : 'Unknown';
};

const createPost = () => {
  router.push('/create');
};

const goToPost = (id) => {
  router.push(`/posts/${id}`);
};

const handleDelete = async (postId) => {
  if (confirm('Are you sure you want to delete this post?')) {
    loading.value[postId] = true; // Set loading state to true for this post

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the post from the list
        posts.value = posts.value.filter(post => post.id !== postId);
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
    } finally {
      loading.value[postId] = false; // Reset the loading state after deletion attempt
    }
  }
};
</script>

<style scoped>
.dark-theme {
  background-color: #121212;
  color: #e0e0e0;
}

.light-theme {
  background-color: #ffffff;
  color: #000000;
}

.center-title {
  text-align: center;
  margin-bottom: 20px;
}

.theme-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.create-button {
  display: block;
  margin: 0 auto 20px auto;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.create-button:hover {
  background-color: #218838;
}

.posts-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>
