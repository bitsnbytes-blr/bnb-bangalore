"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" },
    { name: "Team", href: "/team" },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center glass border-b border-white/5"
    >
      <Link href="/" className="hover:scale-105 transition-transform duration-300 flex items-center">
        <img 
          src="/logo.jpeg" 
          alt="bits&bytes" 
          className="h-10 w-auto object-contain rounded-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] grayscale hover:grayscale-0 transition-all duration-500" 
        />
      </Link>

      <nav className="hidden md:flex gap-8 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-mono tracking-tight transition-colors hover:text-white",
              pathname === link.href ? "text-white" : "text-ash"
            )}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <div className="md:hidden">
        <button onClick={() => setIsMobileMenuOpen(true)} className="text-sm font-mono text-ash hover:text-white transition-colors uppercase tracking-widest">
          Menu
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/95 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:scale-105 transition-transform duration-300">
                <img 
                  src="/logo.jpeg" 
                  alt="bits&bytes" 
                  className="h-10 w-auto object-contain rounded-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-ash hover:text-white transition-colors p-2 bg-white/5 rounded-full border border-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8 flex-1 justify-center items-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "font-heading font-black text-5xl tracking-tighter transition-all hover:text-blood uppercase hover:tracking-widest duration-500",
                      pathname === link.href ? "text-white" : "text-ash/50"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <div className="mt-auto pt-8 border-t border-white/10 flex justify-between items-center">
              <div className="font-mono text-xs text-ash/50 uppercase tracking-widest">
                [ SYSTEM ACTIVE ]
              </div>
              <div className="font-mono text-xs text-blood uppercase tracking-widest">
                v1.0
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
