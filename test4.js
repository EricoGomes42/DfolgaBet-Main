import axios from 'axios';
axios.get('http://localhost:3000/api/wp/posts?per_page=1&_embed=true')
  .then(res => {
     let auth = res.data[0]._embedded ? res.data[0]._embedded.author : null;
     console.log("Author:", auth ? auth[0].name : "none");
  })
  .catch(err => console.error(err.message));
