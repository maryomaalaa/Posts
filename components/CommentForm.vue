<template>
  <div>
    <h3 class="text-lg font-semibold mt-6">Add a Comment</h3>
    <div class="mt-2">
      <input
        v-model="name"
        placeholder="Your name"
        class="w-full p-2 border rounded mb-2"
      />
      <input
        v-model="email"
        placeholder="Your email"
        type="email"
        class="w-full p-2 border rounded mb-2"
      />
      <textarea
        v-model="content"
        placeholder="Your comment"
        class="w-full p-2 border rounded mb-2"
        rows="4"
      ></textarea>
      <button
        @click="submitComment"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  postId: Number,
});

const emits = defineEmits(["submitComment"]);

const name = ref("");
const email = ref("");
const content = ref("");

const submitComment = () => {
  const commentData = {
    postId: props.postId,
    name: name.value,
    email: email.value,
    content: content.value,
  };
  emits("submitComment", commentData);
};
</script>
