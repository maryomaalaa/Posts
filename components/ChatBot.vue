<template>
  <div
    class="max-w-3xl mx-auto border border-gray-300 rounded-lg overflow-hidden bg-gray-100"
  >
    <div class="flex flex-col h-96">
      <div class="flex-1 p-4 overflow-y-auto bg-white">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="{
            'text-right bg-gray-200 text-gray-800': message.isUser,
            'text-left bg-green-100 text-gray-800': !message.isUser,
          }"
          class="p-2 rounded-lg mb-2"
        >
          {{ message.text }}
        </div>
      </div>
      <div class="flex p-2 bg-white border-t border-gray-300">
        <input
          v-model="userInput"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
          class="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          @click="sendMessage"
          class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDfnnLf8B846jL1eA8a7pQreTi5WmzAZDM";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const messages = ref<{ id: number; text: string; isUser: boolean }[]>([]);
const userInput = ref("");

let messageId = 0;

async function sendMessage() {
  if (!userInput.value.trim()) return;

  const userMessage = userInput.value.trim();
  messages.value.push({ id: messageId++, text: userMessage, isUser: true });
  userInput.value = "";

  try {
    const prompt = userMessage;

    const responses = await Promise.all(
      Array.from({ length: 3 }, () => model.generateContent(prompt))
    );

    for (const result of responses) {
      const response = await result.response;
      const botMessage = await response.text();
      messages.value.push({ id: messageId++, text: botMessage, isUser: false });
    }
  } catch (error) {
    messages.value.push({
      id: messageId++,
      text: "Sorry, there was an error. Please try again.",
      isUser: false,
    });
    console.error("Error generating content:", error);
  }
}
</script>
