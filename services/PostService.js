// PostService.js
import axios from "axios";

const API_BASE_URL = "https://localhost:5001/api";

export default {
  async createPost(post) {
    return axios.post(`${API_BASE_URL}/posts`, post);
  },
  async getPosts() {
    return axios.get(`${API_BASE_URL}/posts`);
  },
  async getPostSummaries() {
    return axios.get(`${API_BASE_URL}/posts`);
  },
  async deletePost(postId) {
    return axios.delete(`${API_BASE_URL}/posts/${postId}`);
  },
};
