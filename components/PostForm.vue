<template>
    <div class="form-container">
      <Label size="large">Create a New Post</Label>
      <form @submit.prevent="handleSubmit" class="form-content">
        <!-- Name Input with Label -->
        <div class="mb-4">
          <Label size="medium" for="name">
            Your Name
          </Label>
          <input
            type="text"
            id="name"
            v-model="localName"
            class="mt-1 block input-field"
          />
        </div>
  
        <!-- Title Input with Label -->
        <div class="mb-4">
          <Label size="medium" for="title">
            Title
          </Label>
          <input
            type="text"
            id="title"
            v-model="localTitle"
            class="mt-1 block input-field"
          />
        </div>
  
        <!-- Content Textarea with Label -->
        <div class="mb-4">
          <Label size="medium" for="content">
            Content
          </Label>
          <textarea
            id="content"
            v-model="localBody"
            class="mt-1 block input-field"
            rows="5"
          ></textarea>
        </div>
  
        <!-- Submit Button -->
        <CustomButton type="submit">
          Save Post
        </CustomButton>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    name: String,
    title: String,
    body: String
  });
  
  const emits = defineEmits(['savePost']);
  
  const localName = ref(props.name || '');
  const localTitle = ref(props.title || '');
  const localBody = ref(props.body || '');
  
  const handleSubmit = () => {
    if (!localName.value.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!localTitle.value.trim()) {
      alert('Please enter a title.');
      return;
    }
    if (!localBody.value.trim()) {
      alert('Please enter the content.');
      return;
    }
  
    emits('savePost', {
      name: localName.value,
      title: localTitle.value,
      body: localBody.value
    });
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
  
  </style>
  