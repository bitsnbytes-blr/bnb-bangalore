"use client";

export function CyberGrid() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[60vh] pointer-events-none z-0 overflow-hidden [perspective:800px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#dc262610_1px,transparent_1px),linear-gradient(to_bottom,#dc262610_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:rotateX(60deg)_translateZ(-200px)_translateY(200px)_scale(2)] animate-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-void/90 to-void" />
    </div>
  );
}
