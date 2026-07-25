// 塾経営ガイド記事データ（guides.json）の型付きラッパー。
// guides.json は scripts/prerender.mjs からも読まれる共通ソース。
import raw from './guides.json';

export interface GuideSection {
    heading: string;
    paras?: string[];
    list?: string[];
    parasAfter?: string[];
}

export interface GuideFaq {
    q: string;
    a: string;
}

export interface GuideRelated {
    label: string;
    path: string;
}

export interface Guide {
    slug: string;
    keyword: string;
    eyebrow: string;
    title: string;
    metaTitle: string;
    description: string;
    datePublished: string;
    dateModified: string;
    lead: string[];
    sections: GuideSection[];
    faq: GuideFaq[];
    related: GuideRelated[];
}

export const GUIDES: Guide[] = raw.guides as Guide[];

export const findGuide = (slug: string): Guide | undefined =>
    GUIDES.find((g) => g.slug === slug);
