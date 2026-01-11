import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-brand-blue text-white pt-32 pb-16 relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    <div className="md:col-span-5">
                        <Link href="/" className="inline-block mb-10">
                            <span className="text-4xl font-bold font-display tracking-tighter">
                                URBANEVILLE <span className="text-brand-gold italic">Design.</span>
                            </span>
                        </Link>
                        <p className="text-white/50 text-base font-light leading-relaxed max-w-md mb-12">
                            Crafting soulful spaces that harmonize architectural precision with personal legacy. Based in Nairobi, serving clients globally.
                        </p>
                        <div className="flex gap-6">
                            {["Instagram", "Pinterest", "LinkedIn", "YouTube"].map(social => (
                                <a key={social} href="#" className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors">
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h5 className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-10">Directory</h5>
                        <ul className="space-y-6">
                            <li><Link href="/services" className="text-base font-light hover:text-brand-gold transition-colors">Services</Link></li>
                            <li><Link href="/portfolio" className="text-base font-light hover:text-brand-gold transition-colors">Portfolio</Link></li>
                            <li><Link href="/blog" className="text-base font-light hover:text-brand-gold transition-colors">Perspectives</Link></li>
                            <li><Link href="/contact" className="text-base font-light hover:text-brand-gold transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-5">
                        <h5 className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-10">Inquiries</h5>
                        <div className="space-y-10">
                            <div>
                                <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Studio Location</p>
                                <p className="text-2xl font-display">Westlands, Nairobi, KE</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-white/30 mb-2">Electronic Mail</p>
                                <p className="text-2xl font-display">hello@urbaneville.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em]">
                        &copy; {new Date().getFullYear()} Urbaneville Designs Limited. All Rights Reserved.
                    </p>
                    <div className="flex gap-10">
                        <Link href="#" className="text-white/30 text-[10px] font-bold uppercase tracking-widest hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="text-white/30 text-[10px] font-bold uppercase tracking-widest hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
