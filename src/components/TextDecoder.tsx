"use client";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export function TextDecoder({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let iteration = 0;
    let timeoutId: NodeJS.Timeout;

    const animate = () => {
      setDisplayText(text.split("").map((letter, index) => {
        if(index < iteration) {
          return text[index];
        }
        if (letter === " ") return " ";
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      
      if(iteration >= text.length){
        return;
      }
      
      iteration += 1 / 2; // Speed of decoding
      timeoutId = setTimeout(animate, 30);
    };

    const initialDelay = setTimeout(animate, delay * 1000);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialDelay);
    };
  }, [isInView, text, delay]);

  return <span ref={ref} className={className}>{displayText || text.replace(/./g, "\u00A0")}</span>;
}
