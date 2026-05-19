const https = require('https');

https.get('https://dfolga.com/wp-json/wp/v2/posts?slug=exposicao-amazonia-imersiva-em-belem-2026', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const posts = JSON.parse(data);
    if (posts && posts.length > 0) {
      const p = posts[0];
      console.log(JSON.stringify(p, null, 2));
    } else {
      console.log('No posts found');
    }
  });
});
