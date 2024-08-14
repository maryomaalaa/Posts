<template>
    <Card class="post-card relative">
      <CardHeader>
        <CardTitle class="post-title">{{ title }}</CardTitle>
      </CardHeader>
      <CardContent>
        <p class="post-content">{{ body }}</p>
      </CardContent>
      <CardFooter class="flex flex-col items-start">
        <CardDescription class="post-author">
          Posted by <span class="author-name">{{ author }}</span>
        </CardDescription>
        <div class="button-group">
          <CustomButton
            @click="handleDelete"
            :isDisabled="loading"
            variant="danger"
          >
            {{ loading ? 'Deleting...' : 'Delete' }}
          </CustomButton>
          <CustomButton @click="viewDetails" variant="primary">View Details</CustomButton>
        </div>
      </CardFooter>
    </Card>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    title: String,
    body: String,
    author: String,
    postId: Number,
    loading: Boolean,
  });
  
  const emits = defineEmits(['delete', 'view']);
  
  const handleDelete = () => {
    emits('delete', props.postId);
  };
  
  const viewDetails = () => {
    emits('view', props.postId);
  };
  </script>
  
  <style scoped>
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
  