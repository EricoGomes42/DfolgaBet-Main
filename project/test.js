fetch("https://dfolga.com/wp-json/wp/v2/posts").then(r => console.log("CORS Header:", r.headers.get("access-control-allow-origin")));
