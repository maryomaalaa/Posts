<template>
  <div :class="toggleState ? 'dark-theme' : 'light-theme'">
    <h1 class="center-title">All Posts</h1>
    <div class="theme-toggle">
      <ThemeToggle @updateTheme="toggleState = $event" />
    </div>
    <Button @click="createPost" class="create-button">Create Post</Button>
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
const posts = ref([]);
const users = ref([]);
const loading = ref({});
const progressValues = ref({});
const toggleState = ref(false); // Toggle state for theme
const router = useRouter();
const route = useRoute();

const fetchPosts = async () => {
  try {
    const postResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    posts.value = await postResponse.json();

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
</style>
