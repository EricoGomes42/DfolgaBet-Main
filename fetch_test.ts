import axios from 'axios';

async function run() {
  const res = await axios.get('https://dfolga.com.br/wp-json/wp/v2/posts?per_page=3');
  const posts = res.data;
  posts.forEach(post => {
    const content = post.content.rendered;
    if (content.includes('taboola') || content.includes('Taboola')) {
      console.log(`Post ID: ${post.id}`);
      const matches = content.match(/.{0,80}taboola.{0,80}/gi);
      console.log(matches);
    } else {
      console.log(`Post ID: ${post.id} - No taboola matching`);
    }
  });
}
run();
