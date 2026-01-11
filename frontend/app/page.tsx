'use client';

import { motion } from "framer-motion";
import { ArrowRight, Star, Layers, Layout, Palette, CheckCircle2, MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchServices, fetchProjects, fetchTestimonials } from "@/lib/api";
import { cn, getImageUrl } from "@/lib/utils";

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [s, p, t] = await Promise.all([fetchServices(), fetchProjects(), fetchTestimonials()]);
        setServices(s.results || s);
        setProjects(p.results || p);
        setTestimonials(t.results || t);
      } catch (e) {
        console.error("Failed to fetch data", e);
      }
    };
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-brand-light dark:bg-brand-dark overflow-x-hidden pt-0 scroll-smooth">

      {/* Hero Section: High-End Immersive */}
      <section className="relative min-h-[110vh] flex items-center pt-24 pb-32 overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0 bg-brand-blue">
          <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center scale-110 opacity-70 saturate-[0.8]" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-90" />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="md:w-3/5"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-[2px] bg-brand-gold"></div>
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold font-display">Est. 2018 | Nairobi, Kenya</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-display leading-[0.95] text-white tracking-tight mb-10">
              CRAFTING <br />
              <span className="text-brand-gold italic">ELEGANCE</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl font-light leading-relaxed mb-12 border-l-2 border-brand-gold/30 pl-8">
              We redefine luxury living through architectural precision and a relentless pursuit of aesthetic perfection.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/portfolio">
                <button className="bg-brand-gold text-brand-blue px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-white transition-all shadow-2xl shadow-brand-gold/20 flex items-center gap-3 hover:gap-5">
                  Our Work <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/contact">
                <button className="text-white border border-white/20 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-white/10 transition-all backdrop-blur-md">
                  Consultation
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Floating Element: Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
            className="hidden md:block w-2/5 aspect-[3/4] relative rounded-t-[200px] overflow-hidden border-[12px] border-white/5 shadow-2xl"
          >
            <img src="/hero-bg.png" className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 saturate-150" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/50 to-transparent"></div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px]">Discover</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-brand-gold to-transparent"></div>
        </div>
      </section>

      {/* Philosophy Section: Editorial Approach */}
      <section className="py-32 bg-brand-light dark:bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl group border border-gray-100 dark:border-white/5">
                <img src="/pattern-bg.png" className="w-full h-full object-cover scale-150 group-hover:scale-100 transition-transform duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center bg-brand-blue/80 opacity-0 group-hover:opacity-100 transition-opacity p-12">
                  <p className="text-white text-center text-2xl font-display italic leading-relaxed">"Design is not just what it looks like and feels like. Design is how it works."</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block mb-4">Our Heritage</span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-brand-blue dark:text-white mb-10 leading-[1.1]">
                The Philosophy <br /> of <span className="text-brand-gold italic">Space</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-white/60 font-light leading-loose mb-12 max-w-2xl">
                At Urbaneville Designs, we believe that your environment is an extension of your legacy.
                Our approach integrates contemporary aesthetics with functional durability, creating spaces
                that don't just host lives—they inspire them. From the first sketch to the final polish,
                every detail is curated with uncompromising standards.
              </p>
              <div className="grid grid-cols-2 gap-8 md:gap-12">
                <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border-t-4 border-brand-gold">
                  <h4 className="text-4xl md:text-5xl font-bold font-display text-brand-blue dark:text-brand-gold mb-2">150+</h4>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Dreams Realized</p>
                </div>
                <div className="p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border-t-4 border-brand-blue">
                  <h4 className="text-4xl md:text-5xl font-bold font-display text-brand-blue dark:text-white mb-2">12</h4>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Industry Awards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services: High-End Cards */}
      <section className="py-32 bg-gray-100 dark:bg-black relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block mb-4">Curated Solutions</span>
              <h2 className="text-4xl md:text-6xl font-bold font-display text-brand-blue dark:text-white leading-tight">Mastering The <br /> Art of Interiors</h2>
            </div>
            <Link href="/services" className="px-10 py-4 border-b-2 border-brand-gold text-brand-blue dark:text-white font-bold uppercase tracking-widest text-[10px] md:text-xs hover:text-brand-gold transition-colors">
              Explore Services
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.slice(0, 3).map((service, idx) => {
              const Icon = (service.icon === 'Layout' ? Layout : (service.icon === 'Palette' ? Palette : Layers));
              return (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -15 }}
                  className="group bg-white dark:bg-gray-900 rounded-[60px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    {service.image ? (
                      <img
                        src={getImageUrl(service.image)}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-gold/5 flex items-center justify-center">
                        <Icon size={48} className="text-brand-gold/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-10 group-hover:bg-brand-gold group-hover:text-white transition-all transform group-hover:rotate-6">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold font-display text-brand-blue dark:text-white mb-6 group-hover:text-brand-gold transition-colors">{service.title}</h3>
                    <p className="text-gray-500 dark:text-white/50 text-base font-light leading-relaxed mb-10 flex-1">{service.description}</p>
                    <Link href={`/services/${service.slug}`} className="w-14 h-14 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Showcase: Gallery Style */}
      <section className="py-32 bg-brand-blue text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block mb-6">Our Portfolio</span>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold font-display mb-8">Selected <span className="italic text-brand-gold">Works</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {projects.slice(0, 4).map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative",
                  idx % 2 !== 0 ? "lg:mt-32" : ""
                )}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[80px] cursor-pointer mb-8">
                  <img
                    src={getImageUrl(project.cover_image)}
                    className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-brand-blue/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white text-brand-blue flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 rotate-12 group-hover:rotate-0">
                      <ArrowUpRight size={40} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-brand-gold font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-3">{project.category}</p>
                    <h3 className="text-3xl md:text-4xl font-bold font-display leading-tight">{project.title}</h3>
                    {project.location && (
                      <p className="text-white/40 italic flex items-center gap-2 mt-4 text-[12px] md:text-sm">
                        <MapPin size={14} className="text-brand-gold" /> {project.location}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center">
            <Link href="/portfolio">
              <button className="px-16 py-6 border border-white/20 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs hover:bg-white hover:text-brand-blue transition-all">
                View Full Collection
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust & CTA: Final Impact */}
      <section className="py-40 bg-brand-light dark:bg-brand-dark relative">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-brand-blue dark:text-white leading-[1.1] mb-16">
              Your Vision, <br /> Our <span className="text-brand-gold italic">Craftsmanship</span>.
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-20">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-16 h-16 rounded-full border-4 border-white dark:border-white/10 bg-gray-200 overflow-hidden shadow-xl">
                    <img src={`https://i.pravatar.cc/150?u=${i * 10}`} alt="Client" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-xl font-bold text-brand-blue dark:text-brand-gold leading-none mb-2">98% Satisfaction</p>
                <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-widest">Recommended by industry leaders</p>
              </div>
            </div>
            <Link href="/contact">
              <button className="group relative overflow-hidden bg-brand-blue dark:bg-brand-gold text-white dark:text-brand-dark px-20 py-8 rounded-full font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs shadow-2xl hover:scale-105 transition-transform">
                <span className="relative z-10">Start Your Project</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
