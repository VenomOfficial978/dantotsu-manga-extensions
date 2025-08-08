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
      return this.popularManga(page);
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

    // Fetch manga details
    fetchMangaDetails: async function (url) {
      const html = await this.httpRequest(url);
      const document = this.parseHTML(html);

      const title = document.querySelector("h1")?.textContent.trim();
      const description = document.querySelector(".synopsis")?.textContent.trim();
      const thumbnail = document.querySelector("img")?.getAttribute("src");

      return {
        title: title || "No title",
        author: "Unknown",
        description: description || "No description",
        genres: [],
        status: "Unknown",
        thumbnail: thumbnail || "",
      };
    },

    // Fetch chapters (stub)
    fetchChapters: async function (url) {
      return [
        {
          name: "Chapter 1",
          url: url,
          number: 1
        }
      ];
    },

    // Fetch pages (stub)
    fetchPages: async function (url) {
      return [
        "https://example.com/page1.jpg",
        "https://example.com/page2.jpg"
      ];
    }
  };
}

module.exports = Comick;
