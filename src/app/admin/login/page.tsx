"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TextDecoder } from "@/components/TextDecoder";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // If already logged in, redirect to admin panel
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/admin");
      }
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage({
          type: "success",
          text: "Registration successful! If email verification is enabled, check your email. Otherwise, you can now log in.",
        });
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/admin");
      }
    } catch (err: unknown) {
      console.error("Auth error:", err);
      const errorObj = err as { message?: string };
      setMessage({
        type: "error",
        text: errorObj.message || "An authentication error occurred. Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 min-h-screen overflow-hidden flex items-center justify-center">
        {/* BACKGROUND GLOWS */}
        <div className="absolute top-[30%] right-0 w-[500px] h-[500px] bg-blood/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-blood/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-md w-full mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="mb-8 text-center">
              <h1 className="font-heading font-black text-3xl uppercase mb-2 drop-shadow-xl text-white">
                <TextDecoder text={isSignUp ? "Create Admin" : "Admin Portal"} />
              </h1>
              <p className="font-mono text-ash text-xs tracking-widest uppercase">
                {isSignUp ? "Register secure credentials" : "Authenticate to manage registrations"}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="bg-[#050505] border border-white/10 p-8 md:p-10 shadow-2xl relative">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blood" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blood" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blood" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blood" />

              {message && (
                <div className={`border p-4 font-mono text-xs text-center mb-6 ${
                  message.type === "success" 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                    : "bg-blood/10 border-blood/20 text-blood"
                }`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-ash">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors"
                    placeholder="admin@gobitsnbytes.org"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block font-mono text-xs uppercase tracking-widest text-ash">Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-mono focus:outline-none focus:border-blood transition-colors"
                    placeholder="••••••••••••"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-blood text-white font-mono text-sm px-6 py-4 uppercase tracking-widest hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setMessage(null);
                  }}
                  className="font-mono text-xs text-ash hover:text-blood transition-colors underline underline-offset-4"
                >
                  {isSignUp ? "Back to Sign In" : "Need to create an account? Sign Up"}
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
