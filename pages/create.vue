<template>
    <PostForm @savePost="savePost" />
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const savePost = async ({ name, title, body }) => {
    const newPost = {
      title: title,
      body: body,
      userId: 1,
    };
  
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newPost),
      });
  
      if (response.ok) {
        const createdPost = await response.json();
        router.push({
          path: '/',
          query: {
            refresh: Date.now(),
            newPost: JSON.stringify(createdPost),
          },
        });
      } else {
        console.error('Failed to save the post');
      }
    } catch (error) {
      console.error('Error during saving the post:', error);
    }
  };
  </script>
  
  
  <style scoped>
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 80vh;
    padding-top: 40px;
  }
  
  .form-content {
    width: 100%;
    max-width: 500px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-button {
    display: block;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto; /* Center the button */
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  
  h1 {
    margin-bottom: 20px;
    text-align: center;
    color: #212529;
  }
  </style>
  