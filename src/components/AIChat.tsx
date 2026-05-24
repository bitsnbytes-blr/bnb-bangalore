"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Send, Cpu, Maximize2, Minimize2, Minus } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "streaming" || status === "submitted";
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage({ role: "user", content: input } as any);
    setInput("");
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-black border border-white/10 shadow-[0_0_20px_rgba(255,0,0,0.1)] hover:border-blood/50 hover:shadow-[0_0_30px_rgba(255,0,0,0.2)] transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-ash group-hover:text-blood transition-colors" />
        ) : (
          <Cpu className="w-6 h-6 text-ash group-hover:text-blood transition-colors" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed z-50 flex flex-col bg-[#050505]/95 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300",
              isFullscreen 
                ? "bottom-0 right-0 w-screen h-screen max-h-screen max-w-none rounded-none" 
                : "bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] rounded-2xl"
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-black/50">
              <div className="w-8 h-8 rounded bg-blood/10 border border-blood/20 flex items-center justify-center shrink-0">
                <Terminal className="w-4 h-4 text-blood" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-white text-sm">Avacadooh System</h3>
                <p className="font-mono text-[10px] text-ash/50 uppercase tracking-widest">
                  Secure Channel
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blood animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.5)]" />
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-ash hover:text-white transition-colors">
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-ash hover:text-white transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <Cpu className="w-12 h-12 text-ash" />
                  <p className="font-mono text-sm text-ash max-w-[200px]">
                    System initialized. State your inquiry.
                  </p>
                </div>
              )}
              
              {messages.map((m) => {
                const textContent = (m as unknown as { content?: string; text?: string }).content || (m as unknown as { content?: string; text?: string }).text;
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      m.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    <div
                      className={cn(
                        "px-4 py-3 rounded-2xl font-mono text-sm",
                        m.role === "user"
                          ? "bg-blood/10 border border-blood/20 text-white rounded-br-sm"
                          : "bg-white/5 border border-white/10 text-ash rounded-bl-sm"
                      )}
                    >
                      {m.role === "user" ? (
                        textContent
                      ) : (
                        <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
                          <ReactMarkdown
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                          >
                            {textContent || ""}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-ash/30 mt-2 font-mono uppercase tracking-widest">
                      {m.role === "user" ? "User" : "System"}
                    </span>
                  </div>
                );
              })}
              
              {isLoading && (
                <div className="flex items-center gap-2 text-ash/50 mr-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-blood animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-blood animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-blood animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/50">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Transmit message..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm text-white placeholder:text-ash/50 focus:outline-none focus:border-blood/30 focus:ring-1 focus:ring-blood/30 font-mono transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 rounded-full bg-white/10 text-white hover:bg-blood hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-white/10"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
