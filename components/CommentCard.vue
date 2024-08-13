<template>
    <Card class="comment-card">
      <CardHeader>
        <CardTitle><strong>{{ name }}</strong></CardTitle>
      </CardHeader>
      <CardContent>
        <p>{{ body }}</p>
      </CardContent>
      <CardFooter>
        <em>{{ email }}</em>
      </CardFooter>
    </Card>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    name: String,
    body: String,
    email: String,
  });
  </script>
  
  <style scoped>
  .comment-card {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .comment-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .comment-card p {
    margin: 0;
  }
  
  .comment-card strong {
    display: block;
    margin-bottom: 5px;
  }
  </style>
  