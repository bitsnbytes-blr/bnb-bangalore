"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextDecoder } from "@/components/TextDecoder";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    studentClass: "",
    stream: "",
    github: "",
    experience: "",
    interest: "",
    laptop: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from("registrations")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            school: formData.school,
            class: formData.studentClass,
            stream: formData.stream,
            github: formData.github,
            experience: formData.experience,
            interest: formData.interest,
            laptop: formData.laptop,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Error submitting registration:", err);
      const errorObj = err as { message?: string };
      setError(errorObj.message || "An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 min-h-screen overflow-hidden flex items-center justify-center">
        {/* BACKGROUND ELEMENTS */}
        <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-blood/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-2xl w-full mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <h1 className="font-heading font-black text-4xl md:text-5xl uppercase mb-4 drop-shadow-xl text-white">
                <TextDecoder text="Claim Your Seat" />
              </h1>
              <p className="font-mono text-ash text-sm md:text-base leading-relaxed">
                Taproot PU College Workshop • June 24th, 2026
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {submitted ? (
              <div className="bg-white/5 border border-white/10 p-12 text-center">
                <h2 className="font-heading font-bold text-3xl text-white mb-4">You&apos;re In.</h2>
                <p className="font-mono text-ash mb-8">
                  We&apos;ve received your registration. We will email you the final details soon.
                </p>
                <div className="inline-block border border-blood bg-blood/10 text-blood font-mono text-sm px-6 py-2 rounded-full uppercase tracking-widest">
                  See you there
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#050505] border border-white/10 p-8 md:p-12 space-y-6">
                
                {error && (
                  <div className="bg-blood/10 border border-blood/20 text-blood font-mono text-xs p-4 text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-ash">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-ash">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block font-mono text-xs uppercase tracking-widest text-ash">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="school" className="block font-mono text-xs uppercase tracking-widest text-ash">School / College Name</label>
                  <input 
                    type="text" 
                    id="school" 
                    required
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors"
                    placeholder="e.g. Taproot PU College"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="studentClass" className="block font-mono text-xs uppercase tracking-widest text-ash">Class / Grade</label>
                    <select
                      id="studentClass"
                      required
                      value={formData.studentClass}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors appearance-none"
                    >
                      <option value="" disabled className="bg-black text-ash">Select Class</option>
                      <option value="11th (1st PU)" className="bg-black text-white">11th Grade (1st PU)</option>
                      <option value="12th (2nd PU)" className="bg-black text-white">12th Grade (2nd PU)</option>
                      <option value="Other" className="bg-black text-white">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="stream" className="block font-mono text-xs uppercase tracking-widest text-ash">Stream / Combination</label>
                    <input 
                      type="text" 
                      id="stream" 
                      required
                      value={formData.stream}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors"
                      placeholder="e.g. PCMC, PCMB, Commerce"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="github" className="block font-mono text-xs uppercase tracking-widest text-ash">GitHub username/link <span className="text-white/30">(Optional)</span></label>
                    <input 
                      type="text" 
                      id="github" 
                      value={formData.github}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors"
                      placeholder="e.g. github.com/username"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="laptop" className="block font-mono text-xs uppercase tracking-widest text-ash">Laptop Requirement</label>
                    <select
                      id="laptop"
                      required
                      value={formData.laptop}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors appearance-none"
                    >
                      <option value="" disabled className="bg-black text-ash">Do you need a laptop?</option>
                      <option value="No, I will bring my own laptop" className="bg-black text-white">No, I will bring my own laptop</option>
                      <option value="Yes, I need a laptop provided" className="bg-black text-white">Yes, I need a laptop provided</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="experience" className="block font-mono text-xs uppercase tracking-widest text-ash">Programming Experience Level</label>
                  <select
                    id="experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-black text-ash">Select Experience Level</option>
                    <option value="Beginner (Never coded before)" className="bg-black text-white">Beginner (Never coded before)</option>
                    <option value="Intermediate (Know basic Python/JS/HTML)" className="bg-black text-white">Intermediate (Know basic Python/JS/HTML)</option>
                    <option value="Advanced (Built and shipped working web apps)" className="bg-black text-white">Advanced (Built and shipped working web apps)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="interest" className="block font-mono text-xs uppercase tracking-widest text-ash">What do you hope to build? / Why do you want to join?</label>
                  <textarea 
                    id="interest" 
                    required
                    value={formData.interest}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors resize-none"
                    placeholder="Tell us about a project you want to build or why you want to learn AI & Web Dev..."
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blood text-white font-mono text-sm px-6 py-4 uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? "Processing..." : "Register"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
