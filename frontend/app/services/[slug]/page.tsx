'use client';

import { useEffect, useState } from "react";
import { fetchService } from "@/lib/api";
import { notFound, useParams } from "next/navigation"; // useParams for client component
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

import PageHeader from "@/components/page-header";

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        const load = async () => {
            try {
                const data = await fetchService(slug);
                setService(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [slug]);

    if (loading) return <div className="min-h-screen pt-24 flex justify-center text-brand-blue">Loading...</div>;
    if (!service) return <div className="min-h-screen pt-24 text-center">Service not found</div>;

    return (
        <main className="min-h-screen bg-white dark:bg-brand-dark">
            <PageHeader
                title={service.title}
                category="Our Expertise"
                image={service.image}
            />

            <div className="container mx-auto px-6 py-16">
                <Link href="/services" className="inline-flex items-center text-gray-500 hover:text-brand-gold mb-8 transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> Back to Services
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="lead text-2xl text-brand-blue dark:text-gray-200 mb-8">{service.description}</p>

                            {/* Dummy content if generic */}
                            <h3 className="text-2xl font-bold font-display mb-4">Why Choose Our {service.title}?</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                We specialize in delivering high-quality results that blend aesthetics with functionality.
                                Our team of experts ensures transparency, timeliness, and superior craftsmanship in every project.
                            </p>
                            <ul className="space-y-4">
                                {["Expert Installation", "Premium Materials", "Custom Designs", "Warranty Guaranteed"].map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 className="text-brand-gold mr-3" size={20} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 sticky top-32">
                            <h3 className="text-2xl font-bold font-display mb-6">Start Your Project</h3>
                            <p className="text-gray-500 mb-8">Ready to upgrade your space with our {service.title} services?</p>
                            <Link href="/contact" className="block w-full bg-brand-gold text-brand-dark font-bold text-center py-4 rounded-xl hover:bg-white hover:shadow-xl transition-all">
                                Get a Free Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
