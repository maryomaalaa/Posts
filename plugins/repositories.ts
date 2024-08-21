import { defineNuxtPlugin } from 'nuxt/app';
import { postRepo } from '../repositories/postRepo';
import { commentRepo } from '../repositories/commentRepo';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('postRepo', postRepo);
  nuxtApp.provide('commentRepo', commentRepo);
});
