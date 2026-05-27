"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function CertificateContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Participant";

  return (
    <div className="flex-1 flex items-center justify-center p-4 md:p-12 relative z-10">
      
      {/* Certificate Container */}
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border-2 border-white/10 p-8 md:p-16 overflow-hidden aspect-[1.414/1] flex flex-col justify-center items-center text-center group">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-blood opacity-50 m-8" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-blood opacity-50 m-8" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        
        <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-blood/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 w-full">
          <p className="font-mono text-blood tracking-[0.3em] uppercase text-sm md:text-base mb-6">
            bits&bytes Bangalore
          </p>
          
          <h1 className="font-heading font-black text-4xl md:text-6xl text-white uppercase tracking-tight mb-12">
            Certificate of Completion
          </h1>
          
          <p className="font-mono text-ash/80 text-sm md:text-lg mb-4">
            This is to certify that
          </p>
          
          <h2 className="font-heading font-bold text-5xl md:text-7xl text-white mb-6 border-b border-white/20 pb-4 inline-block px-12">
            {name}
          </h2>
          
          <p className="font-mono text-ash max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-16">
            has successfully completed the AI & Web Development intensive workshop at Taproot PU College. They have demonstrated high-agency building and technical execution.
          </p>
          
          <div className="flex justify-between items-end w-full px-12 font-mono text-xs md:text-sm text-ash/60 uppercase tracking-widest">
            <div className="text-left">
              <div className="border-b border-white/20 pb-2 mb-2 w-32">Sparsh Sharma</div>
              <div>Lead Instructor</div>
            </div>
            
            <div className="text-center">
              <div className="text-blood font-bold text-lg mb-1">b&b</div>
              <div>June 24, 2026</div>
            </div>

            <div className="text-right">
              <div className="border-b border-white/20 pb-2 mb-2 w-32 ml-auto">Basavaraj H.</div>
              <div>School Liaison</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certificate() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-24 pb-12">
        <div className="text-center mb-8 px-6">
          <p className="font-mono text-ash text-sm">
            Tip: Use your browser&apos;s Print feature (Ctrl+P / Cmd+P) and &quot;Save as PDF&quot; to download this certificate.
          </p>
        </div>
        
        <Suspense fallback={<div className="flex-1 flex items-center justify-center font-mono text-white">Loading...</div>}>
          <CertificateContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
