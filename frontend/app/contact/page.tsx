'use client';

import { useState } from "react";
import { submitContact } from "@/lib/api";
import { Mail, Phone, MapPin, Send } from "lucide-react";

import PageHeader from "@/components/page-header";

export default function ContactPage() {
    const [form, setForm] = useState<any>({
        name: '', email: '', phone: '', address: '',
        project_type: 'RESIDENTIAL', budget: '', timeline: '',
        consulted_others: false, other_designers: '', message: '', file: null
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData();
        Object.keys(form).forEach(key => {
            if (key === 'file' && form[key]) {
                formData.append('file', form[key]);
            } else if (key !== 'file') {
                formData.append(key, form[key]);
            }
        });

        try {
            await submitContact(formData);
            setStatus('success');
            setForm({ name: '', email: '', phone: '', address: '', project_type: 'RESIDENTIAL', budget: '', timeline: '', consulted_others: false, other_designers: '', message: '', file: null });
        } catch (e) {
            console.error(e);
            setStatus('error');
        }
    };

    return (
        <main className="min-h-screen bg-white dark:bg-brand-dark">
            <PageHeader
                title="Get In Touch"
                subtitle="We'd love to hear from you. Whether you have a specific project in mind or just want to explore possibilities, our team is ready to help."
                category="Contact"
                image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
            />

            <div className="container mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <span className="text-brand-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block mb-4">Inquiry</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-brand-blue dark:text-white mb-8">Let's Discuss Your <span className="italic text-brand-gold">Project</span></h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold flex-shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-lg text-brand-blue dark:text-white mb-1">Call Us</h5>
                                    <p className="text-gray-500">0714 474 345</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold flex-shrink-0">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-lg text-brand-blue dark:text-white mb-1">Email Us</h5>
                                    <p className="text-gray-500">uvdinteriors@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold flex-shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-lg text-brand-blue dark:text-white mb-1">Visit Us</h5>
                                    <p className="text-gray-500">First Floor Room A06, Nairobi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900 p-10 rounded-3xl border border-gray-100 dark:border-gray-800">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Full Name</label>
                                    <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Email Address</label>
                                    <input type="email" required className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                </div>
                                <div className="md:col-span-1">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Mobile</label>
                                    <input type="tel" required className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Address</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                                        value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                                </div>
                            </div>

                            {/* Project Type */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">Project Type</label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {['RESIDENTIAL', 'COMMERCIAL', 'HOSPITALITY'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setForm({ ...form, project_type: type })}
                                            className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${form.project_type === type ? 'border-brand-gold bg-brand-gold text-brand-dark' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-brand-gold/50'}`}
                                        >
                                            {type.charAt(0) + type.slice(1).toLowerCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Budget & Timeline */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Approx. Project Budget</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                                        value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} placeholder="e.g. $50,000" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Project Timeline</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                                        value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} placeholder="e.g. 3 months" />
                                </div>
                            </div>

                            {/* Consulted Others */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">
                                    Have any other designers or design companies been consulted on this project?
                                </label>
                                <div className="flex gap-6 mb-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="consulted" checked={form.consulted_others === true} onChange={() => setForm({ ...form, consulted_others: true })} className="w-5 h-5 accent-brand-gold" />
                                        <span className="font-medium">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="consulted" checked={form.consulted_others === false} onChange={() => setForm({ ...form, consulted_others: false })} className="w-5 h-5 accent-brand-gold" />
                                        <span className="font-medium">No</span>
                                    </label>
                                </div>
                                {form.consulted_others && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Which designers?</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                                            value={form.other_designers} onChange={e => setForm({ ...form, other_designers: e.target.value })} />
                                    </div>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Detailed description of project and service required</label>
                                <textarea rows={6} required className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-700 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-colors"
                                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                            </div>

                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Upload Sketches / Room Layouts Here</label>
                                <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-brand-gold transition-colors cursor-pointer group">
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={e => {
                                            if (e.target.files) setForm({ ...form, file: e.target.files[0] });
                                        }}
                                    />
                                    <div className="flex flex-col items-center justify-center text-gray-500 group-hover:text-brand-gold transition-colors">
                                        {form.file ? (
                                            <span className="font-bold text-brand-blue dark:text-white">{form.file.name}</span>
                                        ) : (
                                            <>
                                                <span className="mb-2 text-3xl">+</span>
                                                <span className="font-bold">Click to Add File</span>
                                                <span className="text-sm mt-1">No file chosen</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={status === 'submitting'} className="w-full bg-brand-gold text-brand-dark font-bold text-lg py-4 rounded-xl hover:bg-white hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-8">
                                {status === 'submitting' ? 'Sending...' : (<><span className="uppercase tracking-widest">Submit Inquiry</span> <Send size={20} /></>)}
                            </button>

                            {status === 'success' && (
                                <div className="p-4 bg-green-500/10 text-green-500 rounded-xl text-center font-bold">
                                    Inquiry received! We will be in touch shortly.
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="p-4 bg-red-500/10 text-red-500 rounded-xl text-center font-bold">
                                    Something went wrong. Please try again.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
