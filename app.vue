<template>
  <router-view />
  <!-- This is where your routed components will be rendered -->
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

// Optional: Log router navigation for debugging purposes
onMounted(() => {
  const router = useRouter();
  router.afterEach((to, from) => {
    console.log(`Navigated from ${from.fullPath} to ${to.fullPath}`);
  });
});
</script>
