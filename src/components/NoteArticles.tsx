import { useEffect, useState } from 'react';
import { ExternalLink, BookOpen, Loader2 } from 'lucide-react';
import { FadeIn } from './FadeIn';

interface NoteItem {
    title: string;
    pubDate: string;
    link: string;
    thumbnail: string;
    description: string;
}

export const NoteArticles = () => {
    const [articles, setArticles] = useState<NoteItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://note.com/katsu_yossy/rss');
                const data = await res.json();
                if (data.items) {
                    setArticles(data.items.slice(0, 3));
                }
            } catch (e) {
                console.error('Failed to fetch Note articles', e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (error) return null;

    return (
        <section id="note-articles" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-xl mb-6">
                            <BookOpen className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Education Blog</h2>
                        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            教育×AI、経営のヒントなどをNoteで発信しています。<br />
                            最新の知見やEduShiftの想いをご覧ください。
                        </p>
                    </div>
                </FadeIn>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {articles.map((item, index) => (
                            <FadeIn key={index} delay={index * 100}>
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block h-full bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                                        {item.thumbnail ? (
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-green-50 group-hover:bg-green-100 transition-colors">
                                                <span className="text-green-600 font-bold text-lg">Note Article</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-slate-600 shadow-sm">
                                            {new Date(item.pubDate).toLocaleDateString('ja-JP')}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-green-700 transition-colors">
                                            {item.title}
                                        </h3>
                                        <div className="mt-auto pt-4 flex items-center text-green-600 font-bold text-sm">
                                            記事を読む
                                            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </a>
                            </FadeIn>
                        ))}
                    </div>
                )}

                <FadeIn delay={300}>
                    <div className="text-center">
                        <a
                            href="https://note.com/katsu_yossy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 border border-slate-300 rounded-full font-bold hover:bg-slate-50 hover:text-green-700 hover:border-green-300 transition-all shadow-sm gap-2"
                        >
                            <span>Noteですべての記事を見る</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};
