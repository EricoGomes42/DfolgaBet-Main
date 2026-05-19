import axios from 'axios';
axios.get('http://localhost:3000/api/wp/posts?per_page=1&_embed=wp:featuredmedia,wp:term')
  .then(res => {
     console.log("Count:", res.data.length);
     console.log("First post title:", res.data[0].title.rendered);
     let media = res.data[0]._embedded ? res.data[0]._embedded['wp:featuredmedia'] : null;
     console.log("Media array:", media ? media.length : 'none');
  })
  .catch(err => console.error(err.message));
