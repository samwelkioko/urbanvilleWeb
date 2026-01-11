'use client';

import { useEffect, useState } from "react";
import { fetchServices } from "@/lib/api";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Layout, Palette, PenTool, Home, Scissors, Trash2 } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

const iconMap: any = {
    Layers,
    Layout,
    Palette,
    PenTool,
    Home,
    Scissors,
    Trash2
};

import PageHeader from "@/components/page-header";

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchServices();
                setServices(data.results || data);
            } catch (e) {
                console.error(e);
                setServices([
                    { id: 1, title: "Gypsum Ceilings", description: "Modern ceiling designs involving premium gypsum board finishes and specialized light integration.", icon: "Layers", slug: "gypsum", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" },
                    { id: 2, title: "Modular Kitchens", description: "Custom kitchen cabinets, islands, and architectural storage solutions tailored to your lifestyle.", icon: "Layout", slug: "kitchens", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800" },
                    { id: 3, title: "SPC Flooring", description: "High-durability stone plastic composite flooring that combines elegance with industrial strength.", icon: "Layers", slug: "flooring", image: "https://images.unsplash.com/photo-1581850518616-bcb8186c443e?auto=format&fit=crop&q=80&w=800" },
                ]);
            }
        };
        load();
    }, []);

    return (
        <main className="min-h-screen bg-brand-light dark:bg-brand-dark">
            <PageHeader
                title="Our Capabilities"
                subtitle="From high-end residential transformations to precision commercial architectural fittings."
                category="Expertise"
                image="https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&q=80&w=1600"
            />

            <div className="container mx-auto px-6 py-32">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {services.map((service, idx) => {
                        const Icon = iconMap[service.icon] || Layers;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group bg-white dark:bg-white/5 rounded-[50px] border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
                            >
                                {/* Service Image Header */}
                                <div className="relative h-64 overflow-hidden">
                                    {service.image ? (
                                        <img
                                            src={getImageUrl(service.image)}
                                            alt={service.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-brand-gold/10 flex items-center justify-center">
                                            <Icon size={64} className="text-brand-gold/30" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <div className="p-12 pt-8 flex flex-col flex-1">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-gold group-hover:text-white transition-all transform group-hover:-rotate-6 shadow-inner">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-3xl font-bold font-display text-brand-blue dark:text-white mb-6 group-hover:text-brand-gold transition-colors leading-tight">{service.title}</h3>
                                    <p className="text-gray-500 dark:text-white/50 text-base font-light leading-relaxed mb-8 flex-1">{service.description}</p>

                                    <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-brand-blue dark:text-white group-hover:text-brand-gold">
                                        See Detail <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
