import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { CelestialBackground } from "./components/CelestialBackground";
import { OpeningScene } from "./components/OpeningScene";
import { WelcomeSection } from "./components/WelcomeSection";
import { UniverseScene, type PlanetId } from "./components/UniverseScene";
import { ExperienceModal } from "./components/ExperienceModal";
import { FinalSurprise } from "./components/FinalSurprise";
import { MusicControl } from "./components/MusicControl";
import { loveContent } from "./data/loveContent";
import { useAmbientAudio } from "./hooks/useAmbientAudio";

function App() {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [activePlanet, setActivePlanet] = useState<PlanetId | null>(null);
  const [runId, setRunId] = useState(0);
  const { enabled, muted, toggle, toggleMute } = useAmbientAudio(loveContent.audioSrc);

  useEffect(() => {
    document.body.classList.toggle("intro-locked", !entered);
    return () => document.body.classList.remove("intro-locked");
  }, [entered]);

  const enterUniverse = useCallback(() => {
    setEntered(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const explore = useCallback(() => {
    document.getElementById("universe")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reduceMotion]);

  const replay = useCallback(() => {
    setActivePlanet(null);
    setEntered(false);
    setRunId((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <CelestialBackground revealed={entered} />

      <AnimatePresence>{!entered && <OpeningScene onEnter={enterUniverse} />}</AnimatePresence>

      <MusicControl enabled={enabled} muted={muted} onToggle={toggle} onToggleMute={toggleMute} />

      <motion.main
        key={runId}
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0.1 : 1.5, ease: "easeInOut" }}
      >
        <WelcomeSection onExplore={explore} />

        <UniverseScene onOpenPlanet={setActivePlanet} />

        <section className="section-shell min-h-[70vh] items-center text-center">
          <motion.div
            className="mx-auto max-w-2xl"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mx-auto mb-8 block h-px w-24 bg-gradient-to-r from-transparent via-lavender/50 to-transparent" />
            <p className="font-serif text-[clamp(1.6rem,4.5vw,2.7rem)] italic leading-[1.4] text-warmWhite/85">
              “{loveContent.bridgeLine}”
            </p>
            <span className="mx-auto mt-9 block font-hand text-2xl text-blush/75">
              {loveContent.finalSignature}
            </span>
          </motion.div>
        </section>

        <FinalSurprise onReplay={replay} />

        <footer className="relative z-10 border-t border-warmWhite/8 px-6 py-12 text-center">
          <p className="font-hand text-xl text-warmWhite/45">{loveContent.footerLine}</p>
          <p className="mt-3 text-[9px] uppercase tracking-[0.24em] text-gold/40">
            For {loveContent.girlfriendName} · always
          </p>
        </footer>
      </motion.main>

      <ExperienceModal activePlanet={entered ? activePlanet : null} onClose={() => setActivePlanet(null)} />
    </>
  );
}

export default App;
