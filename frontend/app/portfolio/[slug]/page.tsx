'use client';

import { useEffect, useState } from "react";
import { fetchProject } from "@/lib/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import PageHeader from "@/components/page-header";

export default function ProjectDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        const load = async () => {
            try {
                const data = await fetchProject(slug);
                setProject(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [slug]);

    if (loading) return <div className="min-h-screen pt-24 flex justify-center text-brand-blue">Loading...</div>;
    if (!project) return <div className="min-h-screen pt-24 text-center">Project not found</div>;

    return (
        <main className="min-h-screen bg-brand-light dark:bg-brand-dark">
            <PageHeader
                title={project.title}
                category={project.category}
                image={project.cover_image}
            />

            <div className="container mx-auto px-6 py-20">
                <Link href="/portfolio" className="inline-flex items-center text-gray-500 hover:text-brand-gold mb-16 transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> Back to Portfolio
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
                    <div>
                        <h2 className="text-3xl font-bold font-display text-brand-blue dark:text-white mb-8 border-l-4 border-brand-gold pl-6">The Challenge</h2>
                        <p className="text-xl text-gray-600 dark:text-white/60 font-light leading-relaxed mb-12">{project.description}</p>

                        <div className="grid grid-cols-2 gap-8 border-t border-gray-100 dark:border-gray-800 pt-8">
                            {project.location && (
                                <div className="space-y-1">
                                    <h5 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                        <MapPin size={18} className="text-brand-gold" /> Location
                                    </h5>
                                    <p className="text-gray-500 pl-6">{project.location}</p>
                                </div>
                            )}
                            {project.completion_date && (
                                <div className="space-y-1">
                                    <h5 className="font-bold text-gray-800 dark:text-white">Completed</h5>
                                    <p className="text-gray-500">{new Date(project.completion_date).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-2xl">
                        {project.cover_image && (
                            <img src={getImageUrl(project.cover_image)} alt={project.title} className="w-full h-full object-cover" />
                        )}
                    </div>
                </div>

                {project.gallery && project.gallery.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.gallery.map((item: any) => (
                            <div key={item.id} className="relative aspect-video rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 group shadow-lg">
                                <img src={getImageUrl(item.image)} alt={item.caption || "Gallery image"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
