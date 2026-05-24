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
