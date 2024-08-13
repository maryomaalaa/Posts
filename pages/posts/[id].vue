<template>
  <div>
    <h1>{{ post.title }}</h1>
    <p><strong>Post:</strong> {{ post.body }}</p>
    <h2>Comments</h2>
    <div v-if="comments.length" class="comments-container">
      <Card v-for="comment in comments" :key="comment.id" class="comment-card">
        <CardHeader>
          <CardTitle><strong>{{ comment.name }}</strong></CardTitle>
        </CardHeader>
        <CardContent>
          <p>{{ comment.body }}</p>
        </CardContent>
        <CardFooter>
          <em>{{ comment.email }}</em>
        </CardFooter>
      </Card>
    </div>
    <p v-else>No comments found.</p>
    
    <Button @click="goBack" class="back-button">Back to All Posts</Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const postId = route.params.id;
const post = ref({});
const comments = ref([]);

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then(response => response.json())
  .then(data => {
    post.value = data;
  })
  .catch(error => {
    console.error('Failed to load post:', error);
  });

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
  .then(response => response.json())
  .then(data => {
    comments.value = data;
  })
  .catch(error => {
    console.error('Failed to load comments:', error);
  });

const router = useRouter();
const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
h1 {
  color: rgb(32, 104, 191);
}

p {
  margin-bottom: 10px;
}

strong {
  font-weight: bold;
}

em {
  color: gray;
  font-style: italic;
}

.comments-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 20px;
  margin-top: 20px;
}

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

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
