function NovelBuddy() {
  return {
    name: "NovelBuddy",
    baseUrl: "https://novelbuddy.com",

    getChapters: async function (novelUrl) {
      const response = await fetch(novelUrl);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');

      const chapterElements = [...doc.querySelectorAll('.chapter-list a')];
      
      return chapterElements.map(link => ({
        title: link.textContent.trim(),
        url: link.href.startsWith('http') ? link.href : this.baseUrl + link.getAttribute('href')
      }));
    },

    getContent: async function (chapterUrl) {
      const response = await fetch(chapterUrl);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');

      const content = doc.querySelector('.chapter-content')?.innerHTML || 'No content found.';
      return content;
    }
  };
}
