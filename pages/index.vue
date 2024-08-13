<template>
  <div :class="toggleState ? 'dark-theme' : 'light-theme'">
    <h1 class="center-title">All Posts</h1>
    <div class="theme-toggle">
      <Toggle
        v-model:pressed="toggleState"
        aria-label="Toggle theme"
        class="hover:bg-green3 text-mauve11 data-[state=on]:bg-green6 data-[state=on]:text-violet12 shadow-blackA7 flex h-[35px] w-[35px] items-center justify-center rounded bg-white text-base leading-4 shadow-[0_2px_10px] focus-within:shadow-[0_0_0_2px] focus-within:shadow-black"
      >
        <Icon
          :icon="toggleState ? 'mdi:weather-night' : 'mdi:weather-sunny'"
          class="w-[15px] h-[15px]"
        />
      </Toggle>
    </div>
    <Button @click="createPost" class="create-button">Create Post</Button>
    <div class="posts-container">
      <Card v-for="post in posts" :key="post.id" class="post-card relative">
        <CardHeader>
          <CardTitle class="post-title">{{ post.title }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="post-content">{{ post.body }}</p>
        </CardContent>
        <CardFooter class="flex flex-col items-start">
          <CardDescription class="post-author">
            Posted by <span class="author-name">{{ getUserName(post.userId) }}</span>
          </CardDescription>
          <div class="button-group">
            <Button
              @click="handleDelete(post.id)"
              class="delete-button"
              :disabled="loading[post.id]"
            >
              {{ loading[post.id] ? 'Deleting...' : 'Delete' }}
          </Button>
            <Button @click="goToPost(post.id)" class="view-button">View Details</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toggle } from 'radix-vue';
import { Icon } from '@iconify/vue';
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';


const posts = ref([]);
const users = ref([]);
const loading = ref({});
const progressValues = ref({});
const toggleState = ref(false); // Toggle state for theme
const router = useRouter();
const route = useRoute();

// Fetch posts and users
const fetchPosts = async () => {
  try {
    const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    posts.value = await postResponse.json();

    // Check if there's a new post to add
    if (route.query.newPost) {
      const newPost = JSON.parse(route.query.newPost);
      posts.value.unshift(newPost); // Add the new post to the beginning of the array
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
  fetchPosts();  // Fetch posts when the component is mounted
  fetchUsers();  // Fetch users when the component is mounted
});

// Watch for query parameter change to refresh posts
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
  const confirmed = confirm('Are you sure you want to delete this post? This action cannot be undone.');
  if (confirmed) {
    loading.value[postId] = true;
    progressValues.value[postId] = 10;

    const timer = setInterval(() => {
      progressValues.value[postId] += 15;
      if (progressValues.value[postId] >= 100) {
        clearInterval(timer);
      }
    }, 300);

    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      });
      posts.value = posts.value.filter(post => post.id !== postId);
    } catch (error) {
      console.error('Failed to delete post:', error);
    } finally {
      clearInterval(timer);
      loading.value[postId] = false;
      progressValues.value[postId] = 0; // Reset progress value
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

.post-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.post-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.post-author {
  font-weight: bold;
  margin-bottom: 5px;
}

.author-name {
  color: rgb(17, 96, 138);
  font-weight: bold;
}

.post-content {
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}

.delete-button:disabled {
  background-color: #dc3545;
  opacity: 0.7;
  cursor: not-allowed;
}

.view-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.view-button:hover {
  background-color: #0056b3;
}
</style>
