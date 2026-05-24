"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Cpu, Maximize2, Minimize2, Mic } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, status, append } = useChat();
  const isLoading = status === "streaming" || status === "submitted";
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
              "fixed z-50 flex flex-col bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl transition-all duration-300",
              isFullscreen 
                ? "inset-0 w-screen h-screen max-h-screen max-w-none rounded-none" 
                : "bottom-20 right-4 md:bottom-24 md:right-6 w-[calc(100vw-2rem)] md:w-[400px] h-[600px] max-h-[calc(100vh-6rem)] rounded-2xl"
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-transparent">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex-1">
                <h3 className="font-heading font-bold text-white text-sm">Avacadooh</h3>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsFullscreen(!isFullscreen)} className="text-ash hover:text-white transition-colors">
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="text-ash hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-6">
              {messages.length === 0 && (
                <div className="flex flex-col space-y-3 mt-2">
                  <p className="text-sm text-ash mb-2">Ask about our team, hackathons, or how to get involved.</p>
                  
                  {[
                    "Who founded Bits&Bytes and what are they working on?",
                    "What makes Bits&Bytes different from other tech clubs?",
                    "How can I join Bits&Bytes as a student developer?",
                    "Generate a cool sci-fi robot concept for me! 🤖"
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => append({ role: "user", content: suggestion })}
                      className="text-left w-fit px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
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
            <form onSubmit={handleSubmit} className="p-4 bg-[#0a0a0a]">
              <div className="relative flex items-center">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-3 pl-4 pr-20 text-sm text-white placeholder:text-ash/50 focus:outline-none focus:border-white/20 transition-all"
                />
                <div className="absolute right-2 flex items-center gap-2">
                  <button type="button" className="p-2 text-ash hover:text-white transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2 rounded-full bg-blood text-white hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
