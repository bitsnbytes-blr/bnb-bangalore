import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PremiumCard } from "@/components/PremiumCard";
import { TextDecoder } from "@/components/TextDecoder";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Terminal, Code2 } from "lucide-react";

export default function Team() {
  type TeamMember = {
    name: string;
    role: string;
    image: string;
    imageClass?: string;
    bio?: string;
    links?: {
      linkedin?: string;
      github?: string;
      website?: string;
    };
  };

  const bangaloreCoreTeam: TeamMember[] = [
    {
      name: "Manyatha Raj",
      role: "Writing",
      image: "/manyatha.jpg",
      imageClass: "object-[50%_80%] scale-100 group-hover:scale-105",
      links: {
        linkedin: "https://www.linkedin.com/in/manyatha-raj-mk-56b0b4411",
      },
    },
    {
      name: "Shashank R",
      role: "Designing",
      image: "/shashank.jpg",
      links: {
        linkedin: "https://www.linkedin.com/in/shashank-r-24ba52410",
      },
    },
    {
      name: "Amit Emmanuel",
      role: "Outreach",
      image: "/amit.jpg",
      links: {
        linkedin: "https://www.linkedin.com/in/amith-emmanuel-7a222a378",
      },
    },
    {
      name: "Sampreeth Hegde",
      role: "Outreach",
      image: "/sampreeth.png",
      links: {
        linkedin: "https://www.linkedin.com/in/sampreeth-hegde-b270ba411",
      },
    },
    {
      name: "Shyam Awasthi",
      role: "Technical",
      image: "/shyam.jpg",
      imageClass: "object-center scale-100 group-hover:scale-105",
      links: {
        linkedin: "https://www.linkedin.com/in/shyam-awasthi-872181227",
      },
    },
    {
      name: "Narthan Shetty",
      role: "Designing",
      image: "/narthan.jpeg",
      imageClass: "object-center scale-125 group-hover:scale-[1.3]",
      bio: "16-year-old editor, developer & IT lead from Bangalore. School websites, an AI product in the works. Self-taught. Solo. From scratch.",
      links: {
        linkedin: "https://www.linkedin.com/in/narthan-shetty-7600b4411",
      },
    },
    {
      name: "AH Deeyan",
      role: "Outreach",
      image: "/deeyan.jpg",
      imageClass: "object-center scale-100 group-hover:scale-105",
      links: {
        linkedin: "https://www.linkedin.com/in/a-h-deyaan-634804410",
      },
    },
  ];

  const upstreamFounders = [
    { 
      name: "Yash Singh", 
      role: "Chief Executive Officer (CEO)", 
      image: "/yash.avif",
      links: {
        linkedin: "https://www.linkedin.com/in/yashvardhansinghbnb/",
        github: "https://github.com/yashclouded",
        website: "https://yashvibe.codes"
      }
    },
    { 
      name: "Aadrika Maurya", 
      role: "Chief Creative & Operating Officer", 
      image: "/aadrika.avif",
      links: {
        linkedin: "https://www.linkedin.com/in/aadrika-maurya/",
        github: "https://github.com/Aadrika08",
        website: "https://aadrikasportfolio.framer.website/"
      }
    },
    { 
      name: "Akshat Kushwaha", 
      role: "Chief Technology Officer (CTO)", 
      image: "/akshat.avif",
      links: {
        linkedin: "https://www.linkedin.com/in/akshat-singh-kushwaha",
        github: "https://github.com/a3ro-dev",
        website: "https://a3ro.dev/"
      }
    },
  ];

  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-32 overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <h1 className="font-heading font-black text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] mb-8 text-white">
              <TextDecoder text="THE" />
              <br />
              <TextDecoder text="NETWORK" delay={0.5} />
            </h1>
            <p className="font-mono text-ash max-w-2xl text-lg md:text-xl mb-24 leading-relaxed">
              We are high-agency youth taking ownership of our city&apos;s ecosystem.
              We don&apos;t wait for permission. We just ship.
            </p>
          </ScrollReveal>

          {/* BANGALORE LEADERSHIP */}
          <ScrollReveal delay={0.1}>
            <div className="flex items-center gap-6 mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase text-white">Bangalore Leadership</h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>
          </ScrollReveal>

          <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            <ScrollReveal delay={0.2} className="h-full">
              <PremiumCard className="h-full flex flex-col group overflow-hidden border border-white/10 hover:border-blood/50 transition-colors">
                <div className="aspect-[4/5] w-full bg-black relative overflow-hidden border-b border-white/5 shrink-0">
                  <Terminal className="absolute top-4 right-4 w-5 h-5 text-white/30 z-20 group-hover:text-blood transition-colors" />
                  
                  <div className="relative w-full h-full">
                    <img src="/sparsh.jpeg" alt="Sparsh Sharma" className="object-cover object-top w-full h-full grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700" />
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-between flex-1">
                  <div className="mb-10">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">Sparsh Sharma</h2>
                    <div className="inline-block border border-blood bg-blood/10 text-blood font-mono text-sm px-4 py-1.5 rounded-full tracking-widest uppercase mb-8">
                      Co-Lead | Technical
                    </div>
                    
                    <div className="font-mono text-ash/80 leading-relaxed text-sm space-y-4">
                      <p>17-year-old solo full-stack developer. While others are doing todo app tutorials, I&apos;m shipping production software.</p>
                      <p>I&apos;m currently running Manshverse (a custom multi-model AI routing engine) and OrbitVoyage (a 60FPS WebGL satellite tracking system). I own the entire stack—UI, backend, math, and infrastructure.</p>
                      <p>I co-lead the Bangalore fork to pull the smartest teens into one room and force them to ship real things in 48 hours. No lectures. No fake projects. Just code and deadlines. I&apos;m not looking for validation, just people actually building the future.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-auto pt-6 border-t border-white/5 flex-wrap">
                    <a href="https://github.com/sparshsharma-dev" target="_blank" rel="noopener noreferrer" className="font-mono text-white/50 hover:text-blood transition-colors underline decoration-white/20 hover:decoration-blood underline-offset-4 uppercase text-xs md:text-sm tracking-widest">GitHub</a>
                    <a href="https://sparshsharma-dev.xyz" target="_blank" rel="noopener noreferrer" className="font-mono text-white/50 hover:text-blood transition-colors underline decoration-white/20 hover:decoration-blood underline-offset-4 uppercase text-xs md:text-sm tracking-widest">Portfolio</a>
                    <a href="https://linkedin.com/in/sparshsharmadev" target="_blank" rel="noopener noreferrer" className="font-mono text-white/50 hover:text-blood transition-colors underline decoration-white/20 hover:decoration-blood underline-offset-4 uppercase text-xs md:text-sm tracking-widest">LinkedIn</a>
                    <a href="https://instagram.com/sparrsssh" target="_blank" rel="noopener noreferrer" className="font-mono text-white/50 hover:text-blood transition-colors underline decoration-white/20 hover:decoration-blood underline-offset-4 uppercase text-xs md:text-sm tracking-widest">Instagram</a>
                  </div>
                </div>
              </PremiumCard>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="h-full">
              <PremiumCard className="h-full flex flex-col group overflow-hidden border border-white/10 hover:border-blood/50 transition-colors">
                <div className="aspect-[4/5] w-full bg-black relative overflow-hidden border-b border-white/5 shrink-0">
                  <Code2 className="absolute top-4 right-4 w-5 h-5 text-white/30 z-20 group-hover:text-blood transition-colors" />
                  
                  <div className="relative w-full h-full">
                    <img src="/rohan.jpeg" alt="Rohan Sharma" className="object-cover object-top w-full h-full grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700" />
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-between flex-1">
                  <div className="mb-10">
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4">Rohan Sharma</h2>
                    <div className="inline-block border border-white/20 bg-white/5 text-white/80 font-mono text-sm px-4 py-1.5 rounded-full tracking-widest uppercase mb-8">
                      Co-Lead | Outreach
                    </div>
                    
                    <div className="font-mono text-ash/80 leading-relaxed text-sm space-y-4">
                      <p>High school builder deeply obsessed with automation, emerging tech, and fixing real-world problems.</p>
                      <p>I&apos;ve built everything from autonomous street lighting systems to rain sensors, and I&apos;m heavily researching the future of EVs and autonomous systems through initiatives like the Anveshana Program at Prayoga Labs.</p>
                      <p>As Co-Lead, I&apos;m here to cultivate a brutal, high-execution environment where the smartest teenage builders in Bangalore can actually ship things that matter and drive meaningful advancements in engineering.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-auto pt-6 border-t border-white/5">
                    <a href="https://www.linkedin.com/in/rohan-sharma-9b659a349" target="_blank" rel="noopener noreferrer" className="font-mono text-white/50 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white underline-offset-4 uppercase text-xs md:text-sm tracking-widest">LinkedIn</a>
                  </div>
                </div>
              </PremiumCard>
            </ScrollReveal>
          </div>

          {/* BANGALORE CORE TEAM */}
          <ScrollReveal delay={0.4}>
            <div className="flex items-center gap-6 mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase text-white">Bangalore Core Team</h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
            {bangaloreCoreTeam.map((member, i) => (
              <ScrollReveal key={i} delay={0.1 * i} className="h-full">
                <PremiumCard className="group border border-white/5 hover:border-blood/50 transition-colors cursor-pointer overflow-hidden flex flex-col h-full">
                  <div className="aspect-[4/5] bg-black relative overflow-hidden border-b border-white/5 shrink-0">
                    <Terminal className="absolute top-4 right-4 w-4 h-4 text-white/30 z-20 group-hover:text-blood transition-colors" />
                    <div className="absolute top-4 left-4 z-20">
                      <div className="font-mono text-[10px] text-blood border border-blood/20 bg-blood/10 px-2 py-0.5 uppercase tracking-widest">
                        BLR_CORE
                      </div>
                    </div>
                    
                    {member.image ? (
                      <div className="relative w-full h-full overflow-hidden">
                        <img src={member.image} alt={member.name} className={`object-cover w-full h-full grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ${member.imageClass || "object-center scale-100 group-hover:scale-105"}`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                        <span className="text-white/20 font-mono text-sm tracking-widest uppercase">Awaiting Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 bg-[#050505] flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-white mb-2">{member.name}</h3>
                      <div className="font-mono text-xs text-blood tracking-widest uppercase line-clamp-2 mb-4">{member.role}</div>
                      {member.bio && (
                        <p className="font-mono text-ash/80 text-xs leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </div>
                    {member.links && (
                      <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
                        {member.links.linkedin && (
                          <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-white/50 hover:text-blood transition-colors underline decoration-white/20 hover:decoration-blood underline-offset-4 uppercase">LinkedIn</a>
                        )}
                      </div>
                    )}
                  </div>
                </PremiumCard>
              </ScrollReveal>
            ))}
          </div>

          {/* UPSTREAM FOUNDERS */}
          <ScrollReveal delay={0.4}>
            <div className="flex items-center gap-6 mb-12">
              <h2 className="font-heading font-bold text-3xl md:text-4xl uppercase text-white">Upstream Founders</h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
            {upstreamFounders.map((member, i) => (
              <ScrollReveal key={i} delay={0.1 * i} className="h-full">
                <PremiumCard className="group border border-white/5 hover:border-white/20 transition-colors cursor-pointer overflow-hidden flex flex-col h-full">
                  <div className="aspect-[4/5] bg-black relative overflow-hidden border-b border-white/5 shrink-0">
                    <Terminal className="absolute top-4 right-4 w-4 h-4 text-white/30 z-20 group-hover:text-white transition-colors" />
                    <div className="absolute top-4 left-4 z-20">
                      <div className="font-mono text-[10px] text-white/80 border border-white/20 bg-white/10 px-2 py-0.5 uppercase tracking-widest">
                        UPSTREAM_EXEC
                      </div>
                    </div>
                    
                    {member.image ? (
                      <div className="relative w-full h-full">
                        <img src={member.image} alt={member.name} className="object-cover object-center w-full h-full grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center">
                        <span className="text-white/20 font-mono text-sm tracking-widest uppercase">Awaiting Photo</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 bg-[#050505] flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-white mb-2">{member.name}</h3>
                      <div className="font-mono text-xs text-ash tracking-widest uppercase line-clamp-2">{member.role}</div>
                    </div>
                    {member.links && (
                      <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
                        {member.links.github && <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-white/50 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 uppercase">GitHub</a>}
                        {member.links.website && <a href={member.links.website} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-white/50 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 uppercase">Portfolio</a>}
                        {member.links.linkedin && <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-white/50 hover:text-white transition-colors underline decoration-white/20 underline-offset-4 uppercase">LinkedIn</a>}
                      </div>
                    )}
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
