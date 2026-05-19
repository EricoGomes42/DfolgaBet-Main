import axios from 'axios';
axios.get('http://localhost:3000/api/wp/posts?per_page=1&_embed=true')
  .then(res => {
     let terms = res.data[0]._embedded ? res.data[0]._embedded['wp:term'] : null;
     console.log("Terms array:", JSON.stringify(terms, null, 2));
  })
  .catch(err => console.error(err.message));
