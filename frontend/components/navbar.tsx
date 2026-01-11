'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl">
            <div className={cn(
                "flex items-center justify-between px-8 py-4 rounded-3xl transition-all duration-500",
                scrolled ? "glass-light dark:glass-dark shadow-2xl py-3 border-white/20" : "bg-transparent border-transparent"
            )}>
                <Link href="/" className="flex items-center gap-2 group">
                    <span className={cn(
                        "text-2xl font-bold font-display tracking-tighter transition-colors",
                        scrolled ? "text-brand-blue dark:text-white" : "text-white"
                    )}>
                        URBANEVILLE <span className="text-brand-gold italic group-hover:not-italic transition-all">Design</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-xs uppercase font-bold tracking-[0.2em] transition-all hover:text-brand-gold",
                                scrolled ? "text-brand-blue dark:text-gray-300" : "text-white/80"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className={cn(
                                    "p-2.5 rounded-full transition-all",
                                    scrolled
                                        ? "bg-gray-100 dark:bg-white/10 text-brand-blue dark:text-brand-gold hover:scale-110"
                                        : "bg-white/10 text-white hover:bg-white/20"
                                )}
                            >
                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        )}

                        <Link
                            href="/contact"
                            className={cn(
                                "px-7 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all transform hover:scale-105 active:scale-95 shadow-xl",
                                scrolled
                                    ? "bg-brand-blue text-white dark:bg-brand-gold dark:text-brand-dark"
                                    : "bg-white text-brand-blue hover:bg-brand-gold hover:text-brand-blue"
                            )}
                        >
                            Start a Project
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className={cn(
                                "p-2 rounded-full",
                                scrolled ? "bg-gray-100 dark:bg-white/10 text-brand-blue dark:text-brand-gold" : "bg-white/10 text-white"
                            )}
                        >
                            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                    )}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "p-2 transition-colors",
                            scrolled ? "text-brand-blue dark:text-white" : "text-white"
                        )}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-brand-dark border-t border-gray-100 dark:border-gray-800 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-brand-gold py-2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 w-full bg-brand-gold text-brand-dark font-bold text-center py-4 rounded-xl"
                            >
                                Get a Quote
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
