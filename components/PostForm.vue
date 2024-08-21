<template>
  <div class="flex flex-col items-center justify-start min-h-[80vh] pt-10">
    <Label size="large" class="text-2xl font-bold mb-4">
      {{ $t("createNewPostTitle") }}
    </Label>
    <div class="w-full max-w-md bg-white p-5 rounded-lg shadow-md">
      <div class="mb-4">
        <Label
          size="medium"
          for="name"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t("yourNameLabel") }}
        </Label>
        <input
          type="text"
          id="name"
          v-model="localName"
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="mb-4">
        <Label
          size="medium"
          for="title"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t("titleLabel") }}
        </Label>
        <input
          type="text"
          id="title"
          v-model="localTitle"
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div class="mb-4">
        <Label
          size="medium"
          for="content"
          class="block text-sm font-medium text-gray-700"
        >
          {{ $t("contentLabel") }}
        </Label>
        <textarea
          id="content"
          v-model="localBody"
          class="mt-1 block w-full p-2 border border-gray-300 rounded"
          rows="5"
        ></textarea>
      </div>
      <CustomButton
        type="submit"
        @click="handleSubmit"
        class="block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 mx-auto"
      >
        {{ $t("savePostButton") }}
      </CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defineEmits } from "vue";
import { Label } from "radix-vue";
import i18next from "i18next";

const emits = defineEmits(["savePost"]);

const localName = ref("");
const localTitle = ref("");
const localBody = ref("");

const handleSubmit = () => {
  if (
    !localName.value.trim() ||
    !localTitle.value.trim() ||
    !localBody.value.trim()
  ) {
    alert(i18next.t("fillInAllFieldsAlert"));
    return;
  }

  emits("savePost", {
    name: localName.value,
    title: localTitle.value,
    body: localBody.value,
  });
};
</script>
