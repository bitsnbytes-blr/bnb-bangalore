"use client";
import { useRef, useState } from "react";

export function PremiumCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl bg-black border border-white/5 overflow-hidden group ${className}`}
    >
      {/* Outer border glow effect (mouse tracking) */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.2), transparent 40%)`,
        }}
      />
      
      {/* The main background blocking out the center, leaving a 1px border glow */}
      <div className="absolute inset-[1px] bg-[#050505] backdrop-blur-3xl rounded-[23px] z-10" />
      
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
