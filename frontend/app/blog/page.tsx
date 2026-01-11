import { fetchBlogPosts } from "@/lib/api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/page-header";

export default async function BlogPage() {
    let posts = [];
    try {
        const data = await fetchBlogPosts();
        posts = data.results || data;
    } catch (e) {
        console.error(e);
    }

    return (
        <main className="min-h-screen bg-brand-light dark:bg-brand-dark">
            <PageHeader
                title="Beyond The Surface"
                subtitle="Curated insights on architectural trends, luxury lifestyle, and the philosophy of contemporary design."
                category="Insights"
                image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600"
            />

            <div className="container mx-auto px-6 py-20">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32">
                    {posts.length > 0 ? posts.map((post: any, idx: number) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className={cn(
                                "group block",
                                idx % 2 !== 0 ? "md:mt-32" : ""
                            )}
                        >
                            <div className="relative aspect-[16/10] overflow-hidden rounded-[60px] mb-10 shadow-lg group-hover:shadow-2xl transition-all duration-700 border border-gray-100 dark:border-white/5">
                                {post.cover_image && (
                                    <img
                                        src={post.cover_image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute top-8 left-8">
                                    <span className="bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-blue dark:text-brand-gold shadow-sm">
                                        {post.tags?.split(',')[0] || 'Insight'}
                                    </span>
                                </div>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold font-display text-brand-blue dark:text-white mb-6 group-hover:text-brand-gold transition-colors leading-tight">
                                {post.title}
                            </h2>
                            <p className="text-gray-500 dark:text-white/40 text-base font-light leading-relaxed mb-8 line-clamp-3">
                                {post.content.substring(0, 180)}...
                            </p>
                            <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-brand-gold group-hover:gap-6 transition-all">
                                Read Perspective <ArrowRight size={16} />
                            </div>
                        </Link>
                    )) : (
                        <div className="col-span-2 text-center text-gray-500 font-light text-xl italic py-20 border-y border-gray-100 dark:border-white/5">
                            Our design insights are being curated. Check back soon.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
