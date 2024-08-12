<template>
  <div>
    <h1 class="center-title">All Posts</h1>
    <button @click="createPost" class="create-button">Create Post</button>
    <div class="posts-container">
      <div class="post-card" v-for="post in posts" :key="post.id">
        <div class="post-header">
          <h2 class="post-title">{{ post.title }}</h2>
          <button @click="deletePost(post.id)" class="delete-button">Delete</button>
        </div>
        <p class="author"><strong>Posted by:</strong> <span class="author-name">{{ getUserName(post.userId) }}</span></p>
        <p class="post-content">{{ post.body }}</p>
        <button @click="goToPost(post.id)" class="view-button">View Details</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, inject } from 'vue';

const posts = inject('posts'); // Inject the posts from the parent component
const users = ref([]);
const router = useRouter();

// Fetch users data
const fetchUsers = async () => {
  try {
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await userResponse.json();
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

// Function to get the user's name
const getUserName = (userId) => {
  const user = users.value.find(user => user.id === userId);
  return user ? user.name : 'Unknown';
};

// Function to navigate to the post's details page
const createPost = () => {
  router.push('/create');
};

const goToPost = (id) => {
  router.push(`/posts/${id}`);
};

// Function to delete a post
const deletePost = async (postId) => {
  await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
  });
  posts.value = posts.value.filter(post => post.id !== postId);
};

// Fetch users data on component mount
fetchUsers();
</script>

<style scoped>
.center-title {
  text-align: center;
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
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title {
  margin: 0;
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

.author-name {
  color: rgb(17, 96, 138);
}

.post-content {
  margin-bottom: 10px;
}

.view-button {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.view-button:hover {
  background-color: #0056b3;
}
</style>
