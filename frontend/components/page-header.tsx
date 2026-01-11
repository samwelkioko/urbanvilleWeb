'use client';

import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    image?: string;
    category?: string;
}

export default function PageHeader({ title, subtitle, image, category }: PageHeaderProps) {
    return (
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-brand-blue">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                {image ? (
                    <img
                        src={getImageUrl(image)}
                        alt={title}
                        className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
                    />
                ) : (
                    <div className="w-full h-full bg-brand-blue" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/40 via-brand-blue/20 to-brand-light dark:to-brand-dark" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {category && (
                        <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block mb-6">
                            {category}
                        </span>
                    )}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white mb-8 drop-shadow-2xl">
                        {title.split(' ').map((word, i) => (
                            <span key={i} className={i === 1 ? "italic text-brand-gold" : ""}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                    {subtitle && (
                        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>

            {/* Bottom Curve/Shade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-light dark:from-brand-dark to-transparent z-10" />
        </section>
    );
}
