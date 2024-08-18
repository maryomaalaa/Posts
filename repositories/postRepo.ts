export const postRepo = {
    async getPosts() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      return response.json();
    },
    async getPostById(id: number) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return response.json();
    },
    async createPost(post: { title: string; body: string; userId: number }) {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      return response.json();
    },
    async deletePost(id: number) {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    },
  };
  