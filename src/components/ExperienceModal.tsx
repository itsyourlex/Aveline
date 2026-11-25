import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { loveContent } from "../data/loveContent";
import type { PlanetId } from "./UniverseScene";
import { MemoryGallery } from "./MemoryGallery";
import { ReasonsSection } from "./ReasonsSection";
import { LoveLetters } from "./LoveLetters";
import { Timeline } from "./Timeline";

type ExperienceModalProps = {
  activePlanet: PlanetId | null;
  onClose: () => void;
};

export function ExperienceModal({ activePlanet, onClose }: ExperienceModalProps) {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const planet = activePlanet ? loveContent.planets.find((item) => item.id === activePlanet) : null;

  useEffect(() => {
    if (!activePlanet) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("modal-open");
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 80);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [activePlanet, onClose]);

  return (
    <AnimatePresence>
      {activePlanet && planet && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-midnight/90 backdrop-blur-[6px] sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.45 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="experience-title"
        >
          <motion.div
            className="modal-scroll relative h-full w-full overflow-y-auto bg-[radial-gradient(circle_at_50%_-10%,rgba(185,165,255,0.09),transparent_55%),linear-gradient(180deg,#0c0e20,#090b1a)] px-5 pb-20 pt-20 sm:h-auto sm:max-h-[92vh] sm:rounded-[28px] sm:border sm:border-warmWhite/10 sm:px-10 sm:pb-12 sm:pt-16 lg:px-14"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 28, scale: reduceMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.99 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(185,165,255,0.1),transparent_70%)]" />

            <div className="relative mx-auto mb-10 flex max-w-5xl items-center justify-between gap-4">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="button-ghost group"
                aria-label={loveContent.backToUniverseLabel}
              >
                <ArrowLeft size={13} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                <span className="hidden sm:inline">{loveContent.backToUniverseLabel}</span>
                <span className="sm:hidden">Back</span>
              </button>

              <div className="text-right">
                <p className="font-serif text-[19px] text-warmWhite/90 sm:text-[22px]" id="experience-title">
                  {planet.name}
                </p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.22em] text-gold/55">{planet.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="hidden rounded-full border border-warmWhite/15 p-2 text-warmWhite/60 transition-colors hover:border-blush/50 hover:text-warmWhite sm:block"
                aria-label="Close experience"
              >
                <X size={17} />
              </button>
            </div>

            <div className="relative mx-auto max-w-6xl">
              {activePlanet === "memories" && <MemoryGallery />}
              {activePlanet === "reasons" && <ReasonsSection />}
              {activePlanet === "letters" && <LoveLetters />}
              {activePlanet === "moments" && <Timeline />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
