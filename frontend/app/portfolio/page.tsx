'use client';

import { useEffect, useState } from "react";
import { fetchProjects } from "@/lib/api";
import Link from "next/link";
import { ArrowUpRight, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["ALL", "RESIDENTIAL", "COMMERCIAL", "RENOVATION", "LANDSCAPING"];

import PageHeader from "@/components/page-header";

export default function PortfolioPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [filter, setFilter] = useState("ALL");
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data.results || data);
            } catch (e) {
                console.error(e);
            }
        };
        load();
    }, []);

    const filteredProjects = filter === "ALL"
        ? projects
        : projects.filter(p => p.category === filter);

    const openProject = (project: any) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (!selectedProject) return;
        const total = (selectedProject.gallery?.length || 0) + 1; // +1 for cover image
        setCurrentImageIndex((prev) => (prev + 1) % total);
    };

    const prevImage = () => {
        if (!selectedProject) return;
        const total = (selectedProject.gallery?.length || 0) + 1;
        setCurrentImageIndex((prev) => (prev - 1 + total) % total);
    };

    const getImages = (project: any) => {
        const imgs = [project.cover_image];
        if (project.gallery) {
            project.gallery.forEach((g: any) => imgs.push(g.image));
        }
        return imgs;
    };

    return (
        <main className="min-h-screen bg-brand-light dark:bg-brand-dark">
            <PageHeader
                title="Our Portfolio"
                subtitle="Excellence in architectural precision and luxury interiors across Residential and Commercial spaces."
                category="Selected Works"
                image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600"
            />

            <div className="container mx-auto px-6 py-20">
                <div className="flex flex-wrap justify-center gap-6 mb-24">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={cn(
                                "px-10 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all",
                                filter === cat
                                    ? "bg-brand-blue text-white dark:bg-brand-gold dark:text-brand-dark shadow-2xl"
                                    : "bg-white dark:bg-white/5 text-gray-400 hover:text-brand-gold border border-gray-100 dark:border-white/10"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (idx % 3) * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => openProject(project)}
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[80px] mb-8 bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm group-hover:shadow-2xl transition-all duration-700">
                                {project.cover_image && (
                                    <img
                                        src={project.cover_image}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                                        loading="lazy"
                                    />
                                )}
                                <div className="absolute inset-0 bg-brand-blue/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-white text-brand-blue flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                                        <ArrowUpRight size={32} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px] mb-3">{project.category}</span>
                                <h3 className="text-2xl md:text-3xl font-bold font-display text-brand-blue dark:text-white mb-4 group-hover:text-brand-gold transition-colors leading-tight">{project.title}</h3>
                                {project.location && (
                                    <div className="flex items-center text-gray-400 text-[12px] md:text-sm italic">
                                        <MapPin size={14} className="mr-2 text-brand-gold" /> {project.location}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Slider Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                    >
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
                        >
                            <X size={40} strokeWidth={1.5} />
                        </button>

                        <div className="relative w-full max-w-6xl h-full flex flex-col justify-center">
                            {/* Main Image Slider */}
                            <div className="relative aspect-video md:aspect-[16/9] w-full overflow-hidden rounded-[40px] group border border-white/5">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={getImages(selectedProject)[currentImageIndex]}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.8, ease: "circOut" }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                                {/* Controls */}
                                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all"
                                    >
                                        <ChevronLeft size={32} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full transition-all"
                                    >
                                        <ChevronRight size={32} />
                                    </button>
                                </div>
                            </div>

                            {/* Info Bar */}
                            <div className="mt-8 text-white max-w-4xl">
                                <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3 block">{selectedProject.category}</span>
                                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display mb-6">{selectedProject.title}</h2>
                                <div className="flex flex-wrap items-center gap-6 text-white/50 mb-8 font-light text-sm md:text-base">
                                    {selectedProject.location && (
                                        <span className="flex items-center gap-2"><MapPin size={18} className="text-brand-gold" /> {selectedProject.location}</span>
                                    )}
                                    {selectedProject.completion_date && (
                                        <span className="bg-white/5 px-4 py-1 rounded-full border border-white/10">Completed: {new Date(selectedProject.completion_date).getFullYear()}</span>
                                    )}
                                </div>
                                <p className="text-white/80 text-base font-light leading-relaxed line-clamp-4 md:line-clamp-none">{selectedProject.description}</p>
                            </div>

                            {/* Thumbnails */}
                            <div className="mt-10 flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                {getImages(selectedProject).map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImageIndex(i)}
                                        className={cn(
                                            "relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden transition-all",
                                            currentImageIndex === i ? "ring-2 ring-brand-gold scale-105" : "opacity-40 hover:opacity-100"
                                        )}
                                    >
                                        <img src={img} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
