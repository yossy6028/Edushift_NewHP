import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    /** ページ固有の JSON-LD（BreadcrumbList / Article 等）。アンマウント時に除去される */
    jsonLd?: object | object[];
}

export const SITE_BASE_URL = 'https://edu-shift.com';

/** ホーム > … のパンくずを BreadcrumbList JSON-LD に変換するヘルパ */
export const breadcrumbJsonLd = (items: { name: string; path?: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE_BASE_URL}/` },
        ...items.map((item, i) => ({
            '@type': 'ListItem' as const,
            position: i + 2,
            name: item.name,
            ...(item.path ? { item: `${SITE_BASE_URL}${item.path}` } : {}),
        })),
    ],
});

const JSONLD_MARKER = 'data-page-jsonld';

const MetaTags = ({ title, description, image, url, jsonLd }: MetaTagsProps) => {
    const location = useLocation();

    const defaultTitle = "EduShift | 小規模塾・独立する先生のためのAI×Web経営パートナー";
    const defaultDescription = "EduShiftは、小規模塾と独立する先生のための経営パートナー。コンサルティング（塾経営・独立支援・AI活用）、塾専用アプリ・ツール開発、HP制作・運用の3本柱で、AIとWebを活用した集客・業務効率化・指導品質向上を伴走支援します。";
    const defaultImage = `${SITE_BASE_URL}/ogp-image.png`;
    const baseUrl = SITE_BASE_URL;

    const currentTitle = title ? `${title} | EduShift` : defaultTitle;
    const currentDescription = description || defaultDescription;
    const currentImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : defaultImage;
    const currentUrl = url ? `${baseUrl}${url}` : `${baseUrl}${location.pathname}`;
    const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : '';

    useEffect(() => {
        // Update Title
        document.title = currentTitle;

        // Helper to update meta tags
        const updateMeta = (selector: string, attr: string, value: string) => {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute(attr, value);
            }
        };

        // Helper to update or create link tags
        const updateLink = (selector: string, rel: string, href: string, extraAttrs: Record<string, string> = {}) => {
            let element = document.querySelector(selector) as HTMLLinkElement;
            if (!element) {
                element = document.createElement('link');
                element.rel = rel;
                Object.entries(extraAttrs).forEach(([k, v]) => element.setAttribute(k, v));
                document.head.appendChild(element);
            }
            element.href = href;
        };

        // Canonical URL
        updateLink('link[rel="canonical"]', 'canonical', currentUrl);

        // hreflang（日本語のみのサイト。ページごとに自己URLを指す）
        updateLink('link[rel="alternate"][hreflang="ja"]', 'alternate', currentUrl, { hreflang: 'ja' });
        updateLink('link[rel="alternate"][hreflang="x-default"]', 'alternate', currentUrl, { hreflang: 'x-default' });

        // Standard Meta
        updateMeta('meta[name="description"]', 'content', currentDescription);

        // Open Graph
        updateMeta('meta[property="og:title"]', 'content', currentTitle);
        updateMeta('meta[property="og:description"]', 'content', currentDescription);
        updateMeta('meta[property="og:image"]', 'content', currentImage);
        updateMeta('meta[property="og:url"]', 'content', currentUrl);

        // Twitter
        updateMeta('meta[property="twitter:title"]', 'content', currentTitle);
        updateMeta('meta[property="twitter:description"]', 'content', currentDescription);
        updateMeta('meta[property="twitter:image"]', 'content', currentImage);
        updateMeta('meta[property="twitter:url"]', 'content', currentUrl);

    }, [currentTitle, currentDescription, currentImage, currentUrl]);

    useEffect(() => {
        // ページ固有の JSON-LD（index.html の静的 @id グラフを参照できる）
        document.querySelectorAll(`script[${JSONLD_MARKER}]`).forEach((el) => el.remove());
        if (!jsonLdText) return;
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute(JSONLD_MARKER, 'true');
        script.textContent = jsonLdText;
        document.head.appendChild(script);
        return () => { script.remove(); };
    }, [jsonLdText]);

    return null;
};

export default MetaTags;
