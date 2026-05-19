const run = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/wp/posts?per_page=3');
        const json = await res.json();
        const id = json[0].id;
        const res2 = await fetch('http://localhost:3000/api/proxy?url=' + encodeURIComponent('https://dfolga.com.br/wp-json/dfolga/v1/post-config/' + id));
        const txt = await res2.text();
        console.log(txt);
    } catch(err) {
        console.error(err);
    }
}
run();
