<template>
  <router-view :posts="posts" @addPost="addNewPost" />
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';

const posts = ref([]);

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  posts.value = await response.json();
};

const addNewPost = (newPost) => {
  posts.value.unshift(newPost); 
};

provide('posts', posts); 

onMounted(fetchPosts);
</script>
