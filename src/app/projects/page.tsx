import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PremiumCard } from "@/components/PremiumCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextDecoder } from "@/components/TextDecoder";
import { Code2, ExternalLink, GitBranch } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      name: "Manshverse",
      creator: "Sparsh Sharma",
      description: "A custom multi-model AI routing engine designed to dynamically route queries to the most efficient LLMs in real-time.",
      tags: ["AI/ML", "TypeScript", "Routing"],
      links: {
        website: "https://manshverse.site",
        github: "https://github.com/sparshsharma-dev/manshverse-web"
      }
    },
    {
      name: "OrbitVoyage",
      creator: "Sparsh Sharma",
      description: "A 60FPS WebGL satellite tracking system mapping orbital debris and active satellites using raw TLE data.",
      tags: ["WebGL", "Three.js", "Math"],
      links: {
        website: "https://orbitvoyage.vercel.app",
        github: "https://github.com/sparshsharma-dev/OrbitVoyage"
      }
    },
    {
      name: "Lexivoid",
      creator: "Sparsh Sharma",
      description: "Cross-references 7,000+ languages to find or synthesize words for unnamed human experiences.",
      tags: ["Vanilla JS", "Node.js", "NLP"],
      links: {
        website: "https://lexivoid.vercel.app",
        github: "https://github.com/sparshsharma-dev/Lexivoid"
      }
    },
    {
      name: "HybridMind",
      creator: "Akshat Kushwaha",
      description: "An advanced context-aware AI architecture and logic engine, exploring the next frontier of model orchestration.",
      tags: ["AI/ML", "Architecture", "Research"],
      links: {
        github: "https://github.com/a3ro-dev/hybridmind"
      }
    },
    {
      name: "Luna",
      creator: "Akshat Kushwaha",
      description: "A soft, supportive menstrual cycle companion with adaptive predictions and an AI companion chat.",
      tags: ["Next.js", "Tailwind", "AI"],
      links: {
        website: "https://luna-tracker.a3ro.dev",
        github: "https://github.com/a3ro-dev/luna"
      }
    }
  ];

  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 min-h-screen overflow-hidden">
        
        {/* BACKGROUND ELEMENTS */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blood/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="mb-20">
              <div className="inline-block border border-blood bg-blood/10 text-blood font-mono text-sm px-4 py-1.5 rounded-full tracking-widest uppercase mb-6">
                Ship Log
              </div>
              <h1 className="font-heading font-black text-5xl md:text-7xl uppercase mb-6 drop-shadow-xl text-white">
                <TextDecoder text="We Ship Code." />
              </h1>
              <p className="font-mono text-ash max-w-2xl text-lg md:text-xl leading-relaxed">
                The Bangalore fork exists to build. Here is an open registry of the software, tools, and infrastructure created by our community.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ScrollReveal key={i} delay={0.1 * i} className="h-full">
                <PremiumCard className="h-full flex flex-col p-8 md:p-10 border border-white/5 hover:border-blood/30 transition-colors group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-blood/30 group-hover:bg-blood/5 transition-colors">
                      <Code2 className="w-6 h-6 text-ash group-hover:text-blood transition-colors" />
                    </div>
                    
                    <div className="flex gap-3">
                      {project.links.github && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                          <GitBranch className="w-5 h-5" />
                        </a>
                      )}
                      {project.links.website && (
                        <a href={project.links.website} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mb-6 flex-1">
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">{project.name}</h2>
                    <p className="font-mono text-sm text-blood mb-4 uppercase tracking-wider">By {project.creator}</p>
                    <p className="font-mono text-ash/80 leading-relaxed text-sm md:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="font-mono text-[10px] md:text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/70 uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </PremiumCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
