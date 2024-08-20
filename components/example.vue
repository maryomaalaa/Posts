<template>
  <div>
    <h1>Generate Text with Google Gemini</h1>
    <button @click="generateText">Generate Text</button>
    <p v-if="text">{{ text }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch API key from environment variable
const API_KEY = "AIzaSyDfnnLf8B846jL1eA8a7pQreTi5WmzAZDM";
console.log("API Key:", API_KEY); // Log API key for debugging

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const text = ref("");

async function generateText() {
  try {
    const prompt = "Write a story about an AI and magic";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    text.value = await response.text();
  } catch (error) {
    console.error("Error generating content:", error);
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
