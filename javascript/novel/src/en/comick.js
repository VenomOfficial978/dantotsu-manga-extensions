function Comick() {
  const BASE_URL = "https://comick.io";

  return {
    name: "Comick",
    baseUrl: BASE_URL,
    lang: "en",
    isManga: true,

    // Popular manga
    popularManga: async function (page) {
      const url = `${BASE_URL}/popular?page=${page}`;
      const html = await this.httpRequest(url);
      const document = this.parseHTML(html);

      const items = document.querySelectorAll(".group > a");
      const results = [];

      items.forEach(item => {
        const title = item.querySelector(".title")?.textContent.trim();
        const url = item.getAttribute("href");
        const cover = item.querySelector("img")?.getAttribute("src");

        if (title && url && cover) {
          results.push({
            title,
            url: BASE_URL + url,
            thumbnail: cover,
          });
        }
      });

      return results;
    },

    // Latest updates
    latestManga: async function (page) {
      const url = `${BASE_URL}/latest?page=${page}`;
      const html = await this.httpRequest(url);
      const document = this.parseHTML(html);

      const items = document.querySelectorAll(".group > a");
      const results = [];

      items.forEach(item => {
        const title = item.querySelector(".title")?.textContent.trim();
        const url = item.getAttribute("href");
        const cover = item.querySelector("img")?.getAttribute("src");

        if (title && url && cover) {
          results.push({
            title,
            url: BASE_URL + url,
            thumbnail: cover,
          });
        }
      });

      return results;
    },

    // Search
    searchManga: async function (query) {
      const url = `${BASE_URL}/search?word=${encodeURIComponent(query)}`;
      const html = await this.httpRequest(url);
      const document = this.parseHTML(html);

      const items = document.querySelectorAll(".group > a");
      const results = [];

      items.forEach(item => {
        const title = item.querySelector(".title")?.textContent.trim();
        const url = item.getAttribute("href");
        const cover = item.querySelector("img")?.getAttribute("src");

        if (title && url && cover) {
          results.push({
            title,
            url: BASE_URL + url,
            thumbnail: cover,
          });
        }
      });

      return results;
    },

    // Manga details (optional, stub for now)
    mangaDetails: async function (url) {
      return {
        title: "Not implemented",
        author: "",
        description: "",
        genres: [],
        chapters: [],
      };
    }
  };
}

module.exports = Comick;
