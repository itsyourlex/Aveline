import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { loveContent } from "../data/loveContent";

const rotations = [-2.5, 1.8, -1.2, 2.4, -1.9, 1.4];

export function MemoryGallery() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const memories = loveContent.memories;

  const go = useCallback(
    (direction: 1 | -1) => {
      if (activeIndex === null) return;
      setActiveIndex((current) => ((current ?? 0) + direction + memories.length) % memories.length);
    },
    [activeIndex, memories.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, go]);

  return (
    <div className="w-full">
      <header className="mb-10 text-center">
        <p className="eyebrow">Chapter one</p>
        <h3 className="serif-title mt-4 text-[clamp(2.4rem,6vw,4rem)]">{loveContent.memoriesHeading}</h3>
        <p className="soft-copy mx-auto mt-4 max-w-lg text-[13px] sm:text-[14px]">{loveContent.memoriesIntro}</p>
      </header>

      <div className="grid grid-cols-1 justify-items-center gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {memories.map((memory, index) => (
          <motion.button
            key={memory.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group w-full max-w-[290px] text-left"
            initial={{ opacity: 0, y: 30, rotate: rotations[index % rotations.length] }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[index % rotations.length] }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={reduceMotion ? undefined : { rotate: 0, y: -9, scale: 1.02 }}
            transition={{ duration: 0.7, delay: (index % 3) * 0.08 }}
          >
            <span className="polaroid block transition-shadow duration-500 group-hover:shadow-[0_26px_60px_rgba(0,0,0,0.5)]">
              <span className="relative block aspect-[4/3] overflow-hidden bg-violetNight">
                <img
                  src={memory.image}
                  alt={memory.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-midnight/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <span className="mt-3 block px-1 text-center font-serif text-[19px] leading-snug text-[#2a2333]">
                {memory.caption}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-midnight/95 px-4 py-16 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Memory viewer"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 rounded-full border border-warmWhite/20 p-2.5 text-warmWhite/70 transition-colors hover:border-blush/60 hover:text-warmWhite sm:right-7 sm:top-7"
              aria-label="Close memory viewer"
            >
              <X size={19} />
            </button>

            <div className="relative flex w-full max-w-4xl flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={memories[activeIndex].id}
                  className="w-full"
                  initial={{ opacity: 0, scale: 0.96, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: reduceMotion ? 0.1 : 0.45 }}
                >
                  <div className="mx-auto w-full max-w-[560px] rotate-[-1deg] bg-[#f6f0e8] p-2.5 pb-4 shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:p-3 sm:pb-5">
                    <img
                      src={memories[activeIndex].image}
                      alt={memories[activeIndex].caption}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="px-2 pt-4 text-center font-serif text-xl text-[#2a2333] sm:text-2xl">
                      {memories[activeIndex].caption}
                    </figcaption>
                  </div>
                </motion.figure>
              </AnimatePresence>

              <div className="mt-9 flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-warmWhite/20 text-warmWhite/75 transition-all hover:border-lavender/60 hover:text-warmWhite"
                  aria-label="Previous memory"
                >
                  <ChevronLeft size={19} />
                </button>
                <span className="min-w-[70px] text-center text-[10px] uppercase tracking-[0.26em] text-gold/75">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(memories.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-warmWhite/20 text-warmWhite/75 transition-all hover:border-lavender/60 hover:text-warmWhite"
                  aria-label="Next memory"
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
