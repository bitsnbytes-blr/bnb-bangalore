import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PremiumCard } from "@/components/PremiumCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextDecoder } from "@/components/TextDecoder";
import { CalendarDays, MapPin } from "lucide-react";

export default function Events() {
  const events = [
    {
      name: "More Sprints Coming Soon",
      date: "TBD",
      location: "Bangalore",
      description: "We are currently organizing our next set of core sprints and hackathons. Keep an eye on our Discord for early access.",
      status: "UPCOMING",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 min-h-screen overflow-hidden">
        
        {/* BACKGROUND ELEMENTS */}
        <div className="absolute top-[20%] right-0 w-[600px] h-[600px] bg-blood/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="mb-20">
              <div className="inline-block border border-blood bg-blood/10 text-blood font-mono text-sm px-4 py-1.5 rounded-full tracking-widest uppercase mb-6">
                Operations
              </div>
              <h1 className="font-heading font-black text-5xl md:text-7xl uppercase mb-6 drop-shadow-xl text-white">
                <TextDecoder text="Sprints & Events" />
              </h1>
              <p className="font-mono text-ash max-w-2xl text-lg md:text-xl leading-relaxed">
                We don&apos;t do networking events. We do sprints. Intense, focused periods of extreme productivity where real software gets built.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-12">
            {events.map((event, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <PremiumCard className="flex flex-col md:flex-row group overflow-hidden border border-white/5 hover:border-white/20 transition-colors">
                  
                  {/* Image Section */}
                  <div className="md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-white/5">
                    <img 
                      src={event.image} 
                      alt={event.name} 
                      className="object-cover w-full h-full grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050505] to-transparent opacity-80" />
                    
                    <div className="absolute top-4 left-4">
                      <div className={`font-mono text-[10px] px-2 py-0.5 uppercase tracking-widest border ${
                        event.status === 'COMPLETED' ? 'bg-white/5 border-white/20 text-white/50' : 
                        event.status === 'WAITLIST' ? 'bg-blood/10 border-blood/20 text-blood' : 
                        'bg-ash/10 border-ash/20 text-ash'
                      }`}>
                        {event.status}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 md:p-12 flex flex-col justify-center flex-1">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6 group-hover:text-blood transition-colors">{event.name}</h2>
                    
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 font-mono text-sm text-ash">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-white/30" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white/30" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="font-mono text-ash/80 leading-relaxed max-w-xl">
                      {event.description}
                    </p>
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
