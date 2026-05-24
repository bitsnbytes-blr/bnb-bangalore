import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PremiumCard } from "@/components/PremiumCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextDecoder } from "@/components/TextDecoder";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export default function Blog() {
  const posts = [
    {
      title: "Why We Forked Bangalore's Tech Scene",
      author: "Sparsh Sharma",
      date: "May 20, 2026",
      excerpt: "The local ecosystem was plagued by endless tutorials, fake hackathons, and networking events for people who couldn't write a recursive function. We decided to build an alternative.",
      category: "Manifesto"
    },
    {
      title: "The Death of 'Hello World'",
      author: "Manyatha Raj",
      date: "May 22, 2026",
      excerpt: "Stop building to-do apps. Start building infrastructure. A guide on transitioning from tutorial hell to shipping production software.",
      category: "Culture"
    },
    {
      title: "Architecting a 60FPS WebGL Satellite Tracker",
      author: "Sparsh Sharma",
      date: "May 25, 2026",
      excerpt: "Deep dive into the math, Three.js optimizations, and TLE parsing logic that powers OrbitVoyage.",
      category: "Engineering"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 min-h-screen overflow-hidden">
        
        {/* BACKGROUND ELEMENTS */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[800px] bg-blood/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="mb-20">
              <div className="inline-block border border-blood bg-blood/10 text-blood font-mono text-sm px-4 py-1.5 rounded-full tracking-widest uppercase mb-6">
                Transmission
              </div>
              <h1 className="font-heading font-black text-5xl md:text-7xl uppercase mb-6 drop-shadow-xl text-white">
                <TextDecoder text="The Manifesto." />
              </h1>
              <p className="font-mono text-ash max-w-2xl text-lg md:text-xl leading-relaxed">
                Thoughts, deep-dives, and engineering logs from the core team. No fluff, just raw signal.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-8">
            {posts.map((post, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <Link href="#" className="block group">
                  <PremiumCard className="p-8 md:p-10 border border-white/5 group-hover:border-blood/30 transition-all duration-500 relative overflow-hidden">
                    <Terminal className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 group-hover:text-blood/5 transition-colors rotate-12 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="font-mono text-xs px-3 py-1 bg-white/5 border border-white/10 text-white/70 uppercase tracking-widest">
                          {post.category}
                        </span>
                        <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
                          {post.date}
                        </span>
                      </div>
                      
                      <h2 className="font-heading font-bold text-2xl md:text-4xl text-white mb-4 group-hover:text-blood transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="font-mono text-ash/80 leading-relaxed mb-8 max-w-2xl">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                        <span className="font-mono text-sm text-ash uppercase tracking-widest">
                          By {post.author}
                        </span>
                        <div className="flex items-center gap-2 text-blood font-mono text-sm uppercase tracking-widest opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          <span>Read Log</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
