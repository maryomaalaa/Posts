import axios from "axios";

const API_BASE_URL = "https://localhost:5001/api";

export default {
  async addComment(commentData) {
    return axios.post(`${API_BASE_URL}/comments`, commentData);
  },
};
