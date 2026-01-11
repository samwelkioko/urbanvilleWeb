'use client';

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function FloatingCTA() {
    return (
        <motion.a
            href="https://wa.me/254714474345" // Replace with actual number
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-[#25D366]/40 flex items-center justify-center cursor-pointer"
        >
            <MessageCircle className="w-8 h-8" fill="white" />
            <span className="absolute right-full mr-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block">
                Chat with us
            </span>
        </motion.a>
    );
}
