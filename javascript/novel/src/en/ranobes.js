function Ranobes() {
  return {
    name: "Ranobes",
    baseUrl: "https://ranobes.net",

    getChapters: async function (novelUrl) {
      const doc = await fetchDocument(novelUrl);
      const chapters = [];

      doc.querySelectorAll(".chapters-list a").forEach(el => {
        chapters.push({
          name: el.textContent.trim(),
          url: el.href
        });
      });

      return chapters.reverse();
    },

    getContent: async function (chapterUrl) {
      const doc = await fetchDocument(chapterUrl);
      const content = doc.querySelector(".reader-content")?.innerHTML || "";

      return content;
    },

    search: async function (query) {
      const searchUrl = `https://ranobes.net/search/?do=search&story=${encodeURIComponent(query)}`;
      const doc = await fetchDocument(searchUrl);
      const results = [];

      doc.querySelectorAll(".th-item").forEach(el => {
        const name = el.querySelector(".th-title")?.textContent.trim();
        const url = el.querySelector("a")?.href;
        const cover = el.querySelector("img")?.src;

        if (name && url) {
          results.push({ name, url, cover });
        }
      });

      return results;
    }
  };
}
