<template>
    <div class="form-container">
      <h1>Create a New Post</h1>
      <form @submit.prevent="savePost" class="form-content">
        <!-- Name Input with Label -->
        <div class="mb-4">
          <Label for="name" class="block text-sm font-medium text-gray-700">
            Your Name
          </Label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="mt-1 block input-field"
          />
        </div>
  
        <!-- Title Input with Label -->
        <div class="mb-4">
          <Label for="title" class="block text-sm font-medium text-gray-700">
            Title
          </Label>
          <input
            type="text"
            id="title"
            v-model="title"
            class="mt-1 block input-field"
          />
        </div>
  
        <!-- Content Textarea with Label -->
        <div class="mb-4">
          <Label for="content" class="block text-sm font-medium text-gray-700">
            Content
          </Label>
          <textarea
            id="content"
            v-model="body"
            class="mt-1 block input-field"
            rows="5"
          ></textarea>
        </div>
  
        <!-- Submit Button -->
        <button type="submit" class="submit-button">
          Save Post
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { Label } from 'radix-vue'
  
  const name = ref('')
  const title = ref('')
  const body = ref('')
  const router = useRouter()
  
  const savePost = async () => {
    if (!name.value.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!title.value.trim()) {
      alert('Please enter a title.');
      return;
    }
    if (!body.value.trim()) {
      alert('Please enter the content.');
      return;
    }
  
    const newPost = {
      title: title.value,
      body: body.value,
      userId: 1,
    }
  
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newPost),
      })
  
      if (response.ok) {
        const createdPost = await response.json()
        router.push({ 
          path: '/', 
          query: { 
            refresh: Date.now(), 
            newPost: JSON.stringify(createdPost) 
          } 
        })
      } else {
        console.error('Failed to save the post')
      }
    } catch (error) {
      console.error('Error during saving the post:', error)
    }
  }
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
  