fetch('http://localhost:3000/api/wp/posts?per_page=10').then(r => console.log('Status:', r.status, 'Content-Length:', r.headers.get('content-length'))).catch(console.error);
