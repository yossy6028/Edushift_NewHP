import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaTagsProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

const MetaTags = ({ title, description, image, url }: MetaTagsProps) => {
    const location = useLocation();

    const defaultTitle = "EduShift | 教育の明日に、Shiftを。";
    const defaultDescription = "EduShiftは、教育現場のAI活用・業務効率化を支援するコンサルティングパートナーです。";
    const defaultImage = "https://edushift-newhp.vercel.app/ogp-image.png";
    const baseUrl = "https://edushift-newhp.vercel.app";

    const currentTitle = title ? `${title} | EduShift` : defaultTitle;
    const currentDescription = description || defaultDescription;
    const currentImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : defaultImage;
    const currentUrl = url ? `${baseUrl}${url}` : `${baseUrl}${location.pathname}`;

    useEffect(() => {
        // Update Title
        document.title = currentTitle;

        // Helper to update meta tags
        const updateMeta = (selector: string, attr: string, value: string) => {
            let element = document.querySelector(selector);
            if (element) {
                element.setAttribute(attr, value);
            } else {
                // If tag is missing, we could create it, but for simplicity we'll assume they exist in index.html
            }
        };

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

    return null;
};

export default MetaTags;
