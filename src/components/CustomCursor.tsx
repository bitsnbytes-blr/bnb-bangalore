"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { playHoverBlip } from "@/lib/sounds";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches) {
        setIsTouchDevice(true);
      }
    }
  }, []);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [isVisible]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.closest('a')) {
        setCursorVariant("link");
        playHoverBlip();
      } else if (target.tagName.toLowerCase() === 'button' || target.closest('button')) {
        setCursorVariant("button");
        playHoverBlip();
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      mixBlendMode: "difference" as const,
    },
    link: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      borderRadius: "4px",
      mixBlendMode: "difference" as const,
      scale: 1.5,
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(220, 38, 38, 0.15)", // Blood red tint
      border: "1px solid rgba(220, 38, 38, 0.8)",
      borderRadius: "50%",
      mixBlendMode: "normal" as const,
      scale: 1.2,
    }
  };

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `body * { cursor: none !important; }`}} />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {cursorVariant === "link" && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] text-black font-mono font-bold"
          >
            [ ]
          </motion.span>
        )}
      </motion.div>
      
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 bg-white rounded-full mix-blend-difference"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: cursorVariant === "default" ? 1 : 0
        }}
        transition={{ type: "tween", duration: 0 }}
      />
    </>
  );
}
