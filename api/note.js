export default async function handler(req, res) {
    try {
        const response = await fetch('https://note.com/katsu_yossy/rss');
        const xml = await response.text();

        const items = [];
        // Simple regex parsing for the specific structure of Note RSS
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;

        while ((match = itemRegex.exec(xml)) !== null) {
            if (items.length >= 3) break; // Optimization: only parse what we need

            const itemContent = match[1];

            const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
            const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
            const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
            const thumbMatch = itemContent.match(/<media:thumbnail>([\s\S]*?)<\/media:thumbnail>/);

            if (titleMatch && linkMatch) {
                // Clean CDATA if present (Note uses <![CDATA[ ... ]]>)
                const title = titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '');
                const thumbnail = thumbMatch ? thumbMatch[1].trim() : '';

                items.push({
                    title: title,
                    link: linkMatch[1],
                    pubDate: pubDateMatch ? pubDateMatch[1] : '',
                    thumbnail: thumbnail,
                    description: ''
                });
            }
        }

        res.status(200).json({ items });
    } catch (error) {
        console.error('RSS Fetch Error:', error);
        res.status(500).json({ error: 'Failed to fetch RSS', items: [] });
    }
}
