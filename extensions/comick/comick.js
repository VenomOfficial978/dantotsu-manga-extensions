const Comick = (() => {
  const baseUrl = "https://comick.io";
  const imageBase = "https://meo.comick.pictures";

  async function safeFetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return res.json();
  }

  return {
    id: "comick.en",
    name: "Comick",
    baseUrl,
    language: "en",
    version: "1.0.0",

    async search(query) {
      const url = `https://api.comick.io/v1.0/search?q=${encodeURIComponent(query)}`;
      const data = await safeFetchJson(url);
      return (data || []).map(manga => ({
        title: manga.title?.en || "Unknown Title",
        url: `${baseUrl}/comic/${manga.slug}`,
        thumbnail: manga.thumbnail_url || null
      }));
    },

    async getChapters(mangaUrl) {
      const slug = mangaUrl.split("/comic/")[1];
      const url = `https://api.comick.io/v1.0/comic/${slug}/chapters?lang=en`;
      const data = await safeFetchJson(url);
      return (data?.chapters || []).map(ch => ({
        name: `Chapter ${ch.chap}`,
        url: `${baseUrl}/chapter/${ch.hid}`,
        id: ch.hid
      })).reverse();
    },

    async getPages(chapterUrl) {
      const hid = chapterUrl.split("/chapter/")[1];
      const url = `https://api.comick.io/v1.0/chapter/${hid}`;
      const data = await safeFetchJson(url);
      return (data?.chapter?.images || []).map(img => `${imageBase}/${img.url}`);
    }
  };
})();
