"use client";

import { motion } from "framer-motion";

export function ProfileCard({ name, role, isFoundation = false }: { name: string, role: string, isFoundation?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`relative p-[1px] rounded-2xl overflow-hidden ${isFoundation ? 'bg-white/10' : 'bg-blood/20'}`}
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] ${isFoundation ? 'bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]' : 'bg-[conic-gradient(from_0deg,transparent_0_340deg,#DC2626_360deg)]'}`}
        />
      </div>
      <div className="relative z-10 bg-void h-full w-full rounded-xl p-8 flex flex-col items-center justify-center border border-white/5">
        <div className={`w-24 h-24 rounded-full mb-6 ${isFoundation ? 'bg-white/10' : 'bg-blood/10'} border border-white/10 flex items-center justify-center`}>
           <span className="font-heading font-bold text-2xl">{name[0]}</span>
        </div>
        <h3 className="font-heading font-bold text-xl mb-1">{name}</h3>
        <p className="font-mono text-sm text-ash text-center">{role}</p>
      </div>
    </motion.div>
  );
}
