import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CodeOfConduct() {
  return (
    <>
      <Navbar />
      <main className="relative pt-32 pb-24 px-6 min-h-screen flex justify-center">
        <div className="max-w-3xl w-full">
          <div className="mb-12 border-b border-white/10 pb-8">
            <h1 className="font-heading font-black text-5xl tracking-tighter mb-4">
              CODE OF CONDUCT
            </h1>
            <p className="font-mono text-ash text-sm uppercase tracking-widest">
              [ upstream sync: gobitsnbytes.org/coc ]
            </p>
          </div>

          <div className="font-mono text-ash space-y-6 leading-relaxed text-sm md:text-base">
            <p className="text-white">
              bits&bytes is dedicated to providing a harassment-free experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, age, or religion.
            </p>
            
            <p>
              We do not tolerate harassment of participants in any form. Sexual language and imagery is not appropriate for any venue, including talks, workshops, parties, Twitter and other online media.
            </p>
            
            <h2 className="font-bold text-white text-lg mt-8 mb-4">EXPECTED BEHAVIOR</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Participate in an authentic and active way.</li>
              <li>Exercise consideration and respect in your speech and actions.</li>
              <li>Attempt collaboration before conflict.</li>
              <li>Refrain from demeaning, discriminatory, or harassing behavior and speech.</li>
            </ul>

            <h2 className="font-bold text-white text-lg mt-8 mb-4">UNACCEPTABLE BEHAVIOR</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violence, threats of violence or violent language directed against another person.</li>
              <li>Sexist, racist, homophobic, transphobic, ableist or otherwise discriminatory jokes and language.</li>
              <li>Posting or displaying sexually explicit or violent material.</li>
              <li>Personal insults, particularly those related to gender, sexual orientation, race, religion, or disability.</li>
            </ul>

            <div className="mt-12 p-6 border border-blood/30 bg-blood/5 rounded-lg text-blood">
              <p className="font-bold mb-2">ENFORCEMENT</p>
              <p>Participants asked to stop any harassing behavior are expected to comply immediately. If a participant engages in harassing behavior, community organizers retain the right to take any actions to keep the event a welcoming environment for all participants.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
