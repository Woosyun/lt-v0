export default class ManageDashboard{
  #userId = null;
  #posts = [];

  constructor({ userId }) {
    if (!userId) throw ('userId missed!!');

    this.#userId = userId;
  }

  async fetch() {
    const res = await fetch('/api/dashboard', {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify({ userId: this.#userId })
    });
    const { posts } = await res.json();
    this.#posts = posts;
  }

  get posts() {
    return this.#posts;
  }
  set posts(newPosts) {
    this.#posts = newPosts;
  }
}