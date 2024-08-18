<template>
  <div :class="toggleState ? 'dark bg-gray-900 text-gray-200' : 'light bg-white text-black'">
    <h1 class="text-center mb-5 text-2xl font-bold">All Posts</h1>
    <div class="flex justify-center mb-5">
      <ThemeToggle @updateTheme="toggleState = $event" />
    </div>
    <div class="flex justify-center mb-5">
      <CustomButton @click="createPost" variant="success" class="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center">
        Create Post
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
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { postRepo } from '~/repositories/postRepo';


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

    // Check if a new post was created and passed via query parameters
    if (route.query.newPost) {
      const newPost = JSON.parse(route.query.newPost as string);
      posts.value.unshift(newPost); // Add the new post to the top of the list
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

const getUserName = (userId: number) => {
  const user = users.value.find(user => user.id === userId);
  return user ? user.name : 'Unknown';
};

const createPost = () => {
  console.log('Create Post button clicked');
  router.push('/create'); 
};

const goToPost = (id: number) => {
  console.log('View Details button clicked for post ID:', id);
  router.push(`/posts/${id}`);
};

const handleDelete = async (postId: number) => {
  console.log('Delete button clicked for post ID:', postId);
  if (confirm('Are you sure you want to delete this post?')) {
    loading.value[postId] = true;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        posts.value = posts.value.filter(post => post.id !== postId);
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
    } finally {
      loading.value[postId] = false;
    }
  } 
};
</script>
