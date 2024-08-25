import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index,
  },
  /* {
    path: "/posts/:id",
    name: "PostDetails",
    component: PostDetails,
  }, */
  {
    path: "/posts/:id/AddComment",
    name: "AddComment",
    component: AddComment,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
