import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 mt-24 glass relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="mb-4">
            <img src="/logo.jpeg" alt="bits&bytes" className="h-12 w-auto object-contain" />
          </div>
          <p className="text-ash text-sm font-mono max-w-sm">
            A youth-led, builder-first technology network for high-agency teen developers in Bangalore.
          </p>
        </div>

        <div className="flex gap-8 md:gap-16 font-mono text-sm flex-wrap">
          <div className="flex flex-col gap-3">
            <span className="text-white/50 mb-1">Local</span>
            <Link href="/projects" className="text-ash hover:text-white transition-colors">Projects</Link>
            <Link href="/events" className="text-ash hover:text-white transition-colors">Events</Link>
            <Link href="/blog" className="text-ash hover:text-white transition-colors">Blog</Link>
            <Link href="/team" className="text-ash hover:text-white transition-colors">Team</Link>
            <Link href="/coc" className="text-ash hover:text-white transition-colors">Code of Conduct</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-white/50 mb-1">Socials</span>
            <a href="https://instagram.com/gobitsnbytes.bangalore" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-ash hover:text-white transition-colors">Discord</a>
            <a href="#" className="text-ash hover:text-white transition-colors">GitHub</a>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-white/50 mb-1">Foundation</span>
            <a href="https://gobitsnbytes.org" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-white transition-colors">Main Site</a>
            <a href="https://gobitsnbytes.org/about" target="_blank" rel="noopener noreferrer" className="text-ash hover:text-white transition-colors">Upstream Founders</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 text-center md:text-left text-xs text-white/30 font-mono">
        &copy; {new Date().getFullYear()} bits&bytes Bangalore. All rights reserved. Not a Notion clone.
      </div>
    </footer>
  );
}
