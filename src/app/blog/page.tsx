"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PremiumCard } from "@/components/PremiumCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextDecoder } from "@/components/TextDecoder";
import { ArrowRight, Terminal, ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  title: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
  content: string[];
}

export default function Blog() {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      title: "The Bangalore Fork: Establishing the Node",
      author: "Sparsh Sharma",
      date: "May 24, 2026",
      readTime: "4 min read",
      category: "Manifesto",
      excerpt: "How we are initializing the first official bits&bytes fork in Bangalore—focusing on raw software engineering, local hackathons, and hardware sprints for teenage builders.",
      content: [
        "Welcome to the Bangalore Fork of the bits&bytes Foundation. We aren't a traditional club, and we aren't a passive community. We are a hard fork.",
        "Bangalore is the Silicon Valley of Asia, yet the opportunities for teenage developers here are still locked behind traditional schooling, credentialism, and boring, lecture-based hackathons. The Bangalore Fork is here to change that. We are a network for builders, built by builders, entirely led by high-schoolers and undergraduates who want to ship code that actually matters.",
        "Our mission is simple: create an elite, fast-moving, high-intensity environment where teenagers can pair program, deploy hardware nodes, host intense sprints, and build public-benefit technology. We prioritize raw curiosity over standard resumes. If you can build, you belong here.",
        "In the coming weeks, we will launch our first offline co-building sprints and hacker houses. We aren't waiting for permissions or applications—the city's fork is no longer unclaimed. We are active."
      ]
    },
    {
      title: "Manshverse & OrbitVoyage: Engineering Under 18",
      author: "Sparsh Sharma",
      date: "May 10, 2026",
      readTime: "6 min read",
      category: "Engineering",
      excerpt: "A deep dive into high-performance web engineering, custom rendering pipelines, and building digital worlds as a self-taught full-stack developer in Bangalore.",
      content: [
        "When you build complex digital products under 18, you are constantly told that you need to wait—wait for college, wait for a degree, wait for a formal job. But the compiler doesn't care about your age.",
        "In this log, I want to unpack the technical architecture of two of my recent projects: Manshverse (a high-performance, real-time spatial networking platform) and OrbitVoyage (an interactive orbital mechanics simulator). Both of these projects required moving past basic React state and stepping into the world of WebGL, custom shader programming, and real-time state synchronizations over WebSockets.",
        "For Manshverse, the primary bottleneck was rendering efficiency. By writing a custom React Three Fiber pipeline and pooling vectors, I kept the frame rates at a constant 60 FPS even with dozens of active, physics-based avatars in the same lobby. The backend was powered by Node.js, utilizing a Redis-backed memory store for ultra-fast spatial coordinates broadcast.",
        "The lesson here is simple: don't restrict your learning to standard high-school tutorials. If you want to understand how rendering engines, network protocols, or compiler designs work, build them from scratch. That's the bits&bytes way."
      ]
    },
    {
      title: "Reclaiming the City: Why the Bangalore Fork Matters",
      author: "Rohan & Sparsh",
      date: "April 28, 2026",
      readTime: "5 min read",
      category: "Philosophy",
      excerpt: "Traditional college tech clubs are broken, slow, and overly bureaucratic. Here is how we are building a fast-paced, high-intensity alternative for true builders.",
      content: [
        "Traditional tech societies and student clubs have become resume-padding machines. They focus on certificates, hierarchies, and long, slow committee approvals. Real builders get bored and drift away.",
        "We co-founded the Bangalore Fork because we wanted an alternative. We wanted an open-source guild where the only metric of status is what you have shipped. We want projects that break, nodes that go down, and late-night debugging sessions fueled by sheer passion.",
        "By focusing on public-benefit software and open-source infrastructure, we give young developers the chance to work on production-grade systems that affect real users. You won't be building fake 'to-do apps' or standard landing pages. You will be contributing to real networks.",
        "We are reclaiming Bangalore's hacker culture. Join us in our weekly sprints, checkout our open repositories, and let's build the future together."
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 min-h-screen overflow-hidden bg-black">
        
        {/* BACKGROUND GLOW */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[500px] h-[500px] md:h-[800px] bg-blood/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="mb-16 md:mb-20">
              <div className="inline-block border border-blood bg-blood/10 text-blood font-mono text-xs md:text-sm px-4 py-1.5 rounded-full tracking-widest uppercase mb-6">
                Transmission
              </div>
              <h1 className="font-heading font-black text-4xl md:text-7xl uppercase mb-6 drop-shadow-xl text-white">
                <TextDecoder text="The Manifesto." />
              </h1>
              <p className="font-mono text-ash max-w-2xl text-base md:text-xl leading-relaxed">
                Thoughts, deep-dives, and engineering logs from the core team. No fluff, just raw signal.
              </p>
            </div>
          </ScrollReveal>

          {/* BLOG LIST */}
          <div className="flex flex-col gap-8">
            {posts.map((post, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div 
                  onClick={() => setActivePost(post)}
                  className="block cursor-pointer group"
                >
                  <PremiumCard className="p-6 md:p-10 border border-white/5 group-hover:border-blood/30 transition-all duration-500 relative overflow-hidden">
                    <Terminal className="absolute -right-10 -bottom-10 w-40 h-40 md:w-48 md:h-48 text-white/5 group-hover:text-blood/5 transition-colors rotate-12 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <span className="font-mono text-[10px] md:text-xs px-3 py-1 bg-white/5 border border-white/10 text-white/70 uppercase tracking-widest">
                          {post.category}
                        </span>
                        <span className="font-mono text-[10px] md:text-xs text-white/30 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span className="font-mono text-[10px] md:text-xs text-white/30 uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h2 className="font-heading font-bold text-xl md:text-4xl text-white mb-3 md:mb-4 group-hover:text-blood transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="font-mono text-ash/80 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 max-w-2xl line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-white/5 pt-4 md:pt-6">
                        <span className="font-mono text-xs md:text-sm text-ash uppercase tracking-widest flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-white/30" />
                          By {post.author}
                        </span>
                        <div className="flex items-center gap-2 text-blood font-mono text-xs md:text-sm uppercase tracking-widest md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300">
                          <span>Read Log</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </PremiumCard>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>

      {/* FULL POST SCREEN OVERLAY */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md overflow-y-auto px-6 py-12 md:py-24 flex justify-center items-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl w-full relative"
            >
              {/* Back button */}
              <button 
                onClick={() => setActivePost(null)}
                className="mb-8 md:mb-12 flex items-center gap-2 text-ash hover:text-white transition-colors font-mono text-xs md:text-sm uppercase tracking-widest group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Manifestos</span>
              </button>

              <div className="border-b border-white/10 pb-6 md:pb-8 mb-8 md:mb-12">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="font-mono text-xs px-3 py-1 bg-white/5 border border-white/10 text-white/70 uppercase tracking-widest">
                    {activePost.category}
                  </span>
                  <span className="font-mono text-xs text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {activePost.date}
                  </span>
                  <span className="font-mono text-xs text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {activePost.readTime}
                  </span>
                </div>

                <h1 className="font-heading font-black text-3xl md:text-6xl text-white uppercase tracking-tight leading-none mb-6">
                  {activePost.title}
                </h1>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xs text-white">
                    {activePost.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-mono text-xs text-white uppercase tracking-widest">
                      {activePost.author}
                    </p>
                    <p className="font-mono text-[10px] text-ash/50 uppercase tracking-widest">
                      Author / Contributor
                    </p>
                  </div>
                </div>
              </div>

              {/* ARTICLE BODY */}
              <div className="prose prose-invert max-w-none prose-p:font-mono prose-p:text-ash prose-p:leading-relaxed prose-p:text-sm md:prose-p:text-base space-y-6 md:space-y-8 mb-16">
                {activePost.content.map((paragraph, index) => (
                  <p key={index} className="text-ash/90 font-mono">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Action area */}
              <div className="border-t border-white/10 pt-8 flex justify-between items-center">
                <div className="font-mono text-xs text-ash/30 uppercase tracking-widest">
                  [ transmission end ]
                </div>
                <button 
                  onClick={() => setActivePost(null)}
                  className="px-6 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-white font-mono text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all"
                >
                  Close Log
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
