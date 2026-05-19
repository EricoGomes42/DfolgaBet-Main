const routes = [
  "/wp-json/wp/v2/pages?slug=taboola",
  "/wp-json/wp/v2/posts?slug=taboola",
  "/wp-json/wp/v2/posts?slug=ads",
  "/wp-json/wp/v2/pages?slug=ads",
  "/wp-json/wp/v2/blocks",
  "/wp-json/wp/v2/settings",
  "/wp-json/ad-inserter/v1/settings",
  "/wp-json/saswp-output/posts/11241"
];
async function test() {
  for (const r of routes) {
    try {
      const res = await fetch("https://dfolga.com" + r);
      if (res.ok) {
        const text = await res.text();
        if (text.toLowerCase().includes("taboola")) {
          console.log("FOUND IN: " + r);
          console.log(text.substring(0, 500));
        } else {
          console.log("Not found in ok response: " + r);
        }
      } else {
        console.log("Failed: " + r + " " + res.status);
      }
    } catch(e) {}
  }
}
test();
