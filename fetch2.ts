const run = async () => {
    try {
        const res = await fetch('https://dfolga.com.br/wp-json/wp/v2/posts?per_page=3');
        const json = await res.json();
        json.forEach(post => {
            const content = post.content?.rendered || '';
            console.log(`Post ${post.id}`);
            const matches = content.match(/<script.*?taboola.*?<\/script>/gis) || 
                            content.match(/taboola/gis);
            if (matches) {
                console.log('Matches:', matches.slice(0, 3));
            } else {
                console.log('No taboola match');
            }
        });
    } catch(err) {
        console.error(err);
    }
}
run();
