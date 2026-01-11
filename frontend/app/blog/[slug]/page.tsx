import { fetchBlogPost } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import PageHeader from "@/components/page-header";

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post = null;

    try {
        post = await fetchBlogPost(slug);
    } catch (e) {
        console.error("Failed to fetch post:", e);
    }

    if (!post) return notFound();

    return (
        <main className="min-h-screen bg-brand-light dark:bg-brand-dark">
            <PageHeader
                title={post.title}
                category="Insights"
                image={post.cover_image}
            />

            <article className="container mx-auto px-6 py-24 max-w-4xl">
                <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-brand-gold mb-12 transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> Back to Articles
                </Link>

                <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm font-medium mb-12 border-b border-gray-100 dark:border-white/10 pb-12">
                    <div className="flex items-center">
                        <Calendar size={18} className="mr-2 text-brand-gold" />
                        {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    {post.tags && post.tags.split(',').map((tag: string) => (
                        <div key={tag} className="flex items-center bg-gray-50 dark:bg-white/5 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest">
                            <Tag size={12} className="mr-2 text-brand-gold" /> {tag.trim()}
                        </div>
                    ))}
                </div>

                <div className="prose prose-xl dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                    {post.content.split('\n').map((para: string, i: number) => (
                        para.trim() && <p key={i} className="mb-8">{para}</p>
                    ))}
                </div>
            </article>
        </main>
    );
}
