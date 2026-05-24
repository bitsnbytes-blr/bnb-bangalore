import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PremiumCard } from "@/components/PremiumCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextDecoder } from "@/components/TextDecoder";
import { AnimatedButton } from "@/components/AnimatedButton";
import { Terminal } from "lucide-react";

export default function Apply() {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 min-h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* BACKGROUND ELEMENTS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blood/10 blur-[200px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10 w-full text-center">
          <ScrollReveal>
            <div className="mb-12">
              <Terminal className="w-12 h-12 text-blood mx-auto mb-6" />
              <h1 className="font-heading font-black text-5xl md:text-7xl uppercase mb-6 drop-shadow-xl text-white">
                <TextDecoder text="Join The Fork." />
              </h1>
              <p className="font-mono text-ash text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                We are actively looking for high-agency teen developers in Bangalore. We don&apos;t care about your school grades. We care about your GitHub commit history and what you&apos;ve shipped.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <PremiumCard className="p-8 md:p-12 border border-blood/30 bg-black/50 text-left">
              <h2 className="font-heading font-bold text-2xl text-white mb-6 uppercase border-b border-white/10 pb-4">Verification Protocol</h2>
              
              <ul className="space-y-4 font-mono text-ash/80 text-sm md:text-base mb-10 list-disc pl-5 marker:text-blood">
                <li>You must be based in or around Bangalore.</li>
                <li>You must be under 19 years old.</li>
                <li>You must have a public GitHub profile with active contributions.</li>
                <li>You must have shipped at least one working software project (no tutorial apps).</li>
                <li>You must be willing to attend intense, in-person coding sprints.</li>
              </ul>
              
              <div className="flex flex-col items-center justify-center text-center">
                <a href="https://tally.so" target="_blank" rel="noopener noreferrer">
                  <AnimatedButton variant="primary" className="w-full sm:w-auto">
                    Initialize Application &rarr;
                  </AnimatedButton>
                </a>
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-4">
                  Redirects to external verification gateway
                </p>
              </div>
            </PremiumCard>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
