<template>
    <div>
      <h1>Create a New Post</h1>
      <form @submit.prevent="savePost">
        <div>
          <label for="name">Your Name:</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" />
        </div>
        <div>
          <label for="content">Content:</label>
          <textarea id="content" v-model="body"></textarea>
        </div>
        <button type="submit" class="save-button">Save</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const name = ref('');
  const title = ref('');
  const body = ref('');
  const router = useRouter();
  
  const savePost = async () => {
    if (name.value && title.value && body.value) {
      const newPost = {
        title: title.value,
        body: body.value,
        userId: 1, // Assuming a static user ID for simplicity
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
          // Redirect to the "All Posts" page with new post data
          router.push({ 
            path: '/', 
            query: { 
              refresh: Date.now(), 
              newPost: JSON.stringify(createdPost) 
            } 
          });
        } else {
          console.error('Failed to save the post');
        }
      } catch (error) {
        console.error('Error during saving the post:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  input, textarea {
    padding: 10px;
    font-size: 1rem;
    width: 100%;
  }
  
  .save-button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .save-button:hover {
    background-color: #218838;
  }
  </style>
  