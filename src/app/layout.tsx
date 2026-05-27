import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { AIChat } from "@/components/AIChat";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "bits&bytes Bangalore",
  description: "Your city's fork is no longer unclaimed. We are here.",
  keywords: [
    "bits and bytes", "bits&bytes", "gobitsnbytes", "go bits and bytes", "bits and bytes bangalore",
    "bits&bytes bangalore", "bnb bangalore", "bnb", "sparsh sharma", "rohan sharma", "akshat kushwaha",
    "yash", "aadrika", "basavaraj", "manyatha", "shashank", "amit", "shyam", "sampreeth", "deyaan",
    "teenage builders", "high school hackers", "student developers", "hackathons in bangalore",
    "bangalore tech community", "youth tech community", "high-agency youth", "gen z tech",
    "manshverse", "orbitvoyage", "anveshana program", "prayoga labs", "student hackathons",
    "coding community bangalore", "software development", "tech meetups bangalore", "web3", "ai",
    "teen coders", "builders in bangalore", "indie hackers", "tech events bangalore", "gobitsnbytes.org",
    "programming community", "nextjs", "react", "typescript", "full stack developers", "open source"
  ],
  verification: {
    google: "pjeNo071rEkgdyNswKaJVAlgOTAS8F4Eh57f1pWklKc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white relative min-h-screen`}>
        <CustomCursor />
        <div className="fixed inset-0 bg-noise mix-blend-overlay z-50 pointer-events-none" />
        {children}
        <AIChat />
      </body>
    </html>
  );
}
