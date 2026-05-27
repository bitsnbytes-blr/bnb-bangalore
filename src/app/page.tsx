import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedButton } from "@/components/AnimatedButton";
import { ParticleGrid } from "@/components/ParticleGrid";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PremiumCard } from "@/components/PremiumCard";
import { CyberGrid } from "@/components/CyberGrid";
import { TextDecoder } from "@/components/TextDecoder";
import { VelocityMarquee } from "@/components/VelocityMarquee";
import { Terminal, Zap, Users, Code2, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative pt-24 overflow-hidden">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col justify-center px-6">
          <CyberGrid />
          <ParticleGrid />
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] mb-8 mix-blend-difference drop-shadow-2xl text-balance">
                <TextDecoder text="THE BANGALORE FORK" /><br/>
                <span className="text-white/20 line-through">TUTORIAL HELL.</span><br/>
                <span className="text-blood bg-clip-text text-transparent bg-gradient-to-br from-blood via-red-500 to-blood-deep">WE SHIP CODE.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-mono text-ash max-w-xl text-lg md:text-xl mb-12 leading-relaxed">
                A youth-led, builder-first network. We are rejecting the standard path to assemble the most high-agency teen developers in the city.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/events/register">
                  <AnimatedButton variant="primary">Apply for Sprints</AnimatedButton>
                </Link>
                <Link href="/blog">
                  <AnimatedButton variant="outline">View Manifesto</AnimatedButton>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* MISSION BENTO GRID */}
        <section className="py-32 md:py-48 px-4 md:px-6 relative">
          {/* Subtle global glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-blood/50 to-transparent" />
          
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-6 mb-20">
                <h2 className="font-heading font-bold text-4xl md:text-5xl uppercase text-white">
                  <TextDecoder text="The Philosophy" />
                </h2>
                <div className="h-px bg-white/10 flex-1" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ScrollReveal delay={0.1} className="md:col-span-2">
                <PremiumCard className="p-8 md:p-12 h-[400px] flex flex-col justify-end">
                  <Terminal className="absolute top-8 right-8 w-64 h-64 text-white/5 -rotate-12 pointer-events-none" />
                  <div className="relative z-10">
                    <Zap className="w-8 h-8 text-blood mb-6" />
                    <h3 className="font-heading font-bold text-3xl md:text-5xl mb-4 text-white">Action Over Tutorials.</h3>
                    <p className="font-mono text-ash/80 leading-relaxed max-w-lg md:text-lg">
                      We are rejecting the tutorial loop. The Bangalore fork exists for one reason: to assemble builders who want to ship real, scalable products. No more &quot;Hello World&quot;.
                    </p>
                  </div>
                </PremiumCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <PremiumCard className="p-8 md:p-10 h-[400px] flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                      <span className="text-white font-bold font-mono">01</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-2xl mb-3 text-white">High Agency</h3>
                    <p className="font-mono text-sm text-ash/70 leading-relaxed">Nobody is coming to save you. We empower those who take absolute ownership of their outcomes.</p>
                  </div>
                </PremiumCard>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <PremiumCard className="p-8 md:p-10 h-[400px] flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                      <span className="text-white font-bold font-mono">02</span>
                    </div>
                    <Users className="w-6 h-6 text-blood/50" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-2xl mb-3 text-white">Teen-Led</h3>
                    <p className="font-mono text-sm text-ash/70 leading-relaxed">Built by youth, for youth. We are redefining the local technology ecosystem from the ground up.</p>
                  </div>
                </PremiumCard>
              </ScrollReveal>

              <ScrollReveal delay={0.4} className="md:col-span-2">
                <PremiumCard className="p-8 md:p-12 h-[400px] flex flex-col justify-center">
                  <Code2 className="absolute -bottom-10 right-10 w-80 h-80 text-blood/5 pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="font-heading font-bold text-3xl md:text-5xl mb-4 text-white">Open Source Native.</h3>
                    <p className="font-mono text-ash/80 leading-relaxed max-w-xl md:text-lg">
                      Everything we do contributes back to the community. We maintain the fork, we fix the bugs, we write the documentation. Our code is our reputation.
                    </p>
                  </div>
                </PremiumCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* HIGH VELOCITY MARQUEE */}
        <VelocityMarquee />

        {/* UPCOMING SPRINTS (SLEEK LIST INSTEAD OF BOXES) */}
        <section className="py-32 md:py-48 px-4 md:px-6 relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-blood/10 blur-[150px] rounded-full pointer-events-none z-0" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal>
              <h2 className="font-heading font-bold text-4xl md:text-6xl uppercase mb-16 text-white text-center">
                <TextDecoder text="Upcoming Sprints" />
              </h2>
            </ScrollReveal>
            
            <div className="border-t border-white/10 flex flex-col">
              {[
                { name: "BLR Core V1 Initialization", date: "June 15, 2026", status: "OPEN" },
                { name: "Hackerspace Takeover", date: "July 02, 2026", status: "WAITLIST" },
                { name: "AI Infrastructure Hackathon", date: "July 28, 2026", status: "LOCKED" }
              ].map((sprint, i) => (
                <ScrollReveal key={i} delay={0.1 * i}>
                  <div className="group border-b border-white/10 hover:border-blood py-10 md:py-14 transition-colors cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="font-mono text-xs text-ash group-hover:text-blood transition-colors tracking-widest uppercase flex items-center gap-4">
                        <span>{sprint.date}</span>
                        <div className="h-px w-8 bg-white/20 group-hover:bg-blood transition-colors" />
                      </div>
                      <h4 className="font-heading font-bold text-3xl md:text-5xl text-white/80 group-hover:text-white transition-colors">
                        {sprint.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className={`font-mono text-sm tracking-widest uppercase ${
                        sprint.status === "OPEN" ? "text-blood" : "text-ash/50"
                      }`}>
                        [{sprint.status}]
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blood group-hover:bg-blood/10 transition-all -rotate-45 group-hover:rotate-0">
                        <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-blood transition-colors" />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 px-6 max-w-4xl mx-auto border-t border-white/5">
          <ScrollReveal>
            <h2 className="font-heading font-bold text-3xl md:text-5xl uppercase mb-12 text-center text-white">
              <TextDecoder text="Frequently Asked" />
            </h2>
            
            <div className="flex flex-col gap-4">
              {[
                { q: "Who can join the Bangalore fork?", a: "We are strictly looking for high-agency teen developers under 19 based in Bangalore. If you build real things, you belong here." },
                { q: "Is this a paid bootcamp or course?", a: "No. bits&bytes is 100% free and open-source. We are a community of builders, not an ed-tech company." },
                { q: "Do I need to be an expert coder?", a: "You don't need to be an expert, but you must have moved past 'tutorial hell'. If you've shipped a project end-to-end, you're ready." },
                { q: "What happens at a Sprint?", a: "Sprints are intense, in-person coding sessions. You pitch an idea, form a team, and ship a working product within a tight deadline. No lectures, no fluff." }
              ].map((faq, i) => (
                <PremiumCard key={i} className="p-6 md:p-8 border border-white/5 group">
                  <details className="group/details">
                    <summary className="flex justify-between items-center font-heading font-bold text-lg md:text-xl text-white cursor-pointer list-none">
                      {faq.q}
                      <ChevronDown className="w-5 h-5 text-ash group-open/details:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-4 font-mono text-ash/80 leading-relaxed text-sm md:text-base">
                      {faq.a}
                    </p>
                  </details>
                </PremiumCard>
              ))}
            </div>
          </ScrollReveal>
        </section>

      </main>
      <Footer />
    </>
  );
}
