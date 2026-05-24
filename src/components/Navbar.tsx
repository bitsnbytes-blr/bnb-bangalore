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
      <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
        <img src="/logo.jpeg" alt="bits&bytes" className="h-10 w-auto object-contain" />
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-[#050505] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:opacity-80 transition-opacity">
                <img src="/logo.jpeg" alt="bits&bytes" className="h-10 w-auto object-contain" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-ash hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "font-heading font-bold text-4xl tracking-tight transition-colors hover:text-blood uppercase",
                    pathname === link.href ? "text-white" : "text-ash/70"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto pt-8 border-t border-white/10 font-mono text-xs text-ash/50 uppercase tracking-widest">
              [ SYSTEM ACTIVE ]
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
