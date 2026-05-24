"use client";

export function VelocityMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-blood/5 py-6 border-y border-blood/20 z-0 transform -skew-y-2 my-32">
      <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap w-[200%]">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="text-5xl md:text-7xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-blood/30 to-blood/10 uppercase mx-8 shrink-0 tracking-widest blur-[1px]">
            {"// NO TUTORIALS // SHIP CODE // HIGH AGENCY"}
          </span>
        ))}
      </div>
    </div>
  );
}
