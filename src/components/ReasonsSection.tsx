import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { loveContent } from "../data/loveContent";

export function ReasonsSection() {
  const reduceMotion = useReducedMotion();
  const reasons = loveContent.reasons;
  const [discovered, setDiscovered] = useState<Set<number>>(() => new Set());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const nextUndiscovered = useMemo(() => {
    for (let offset = 1; offset <= reasons.length; offset += 1) {
      const candidate = ((activeIndex ?? -1) + offset + reasons.length) % reasons.length;
      if (!discovered.has(candidate)) return candidate;
    }
    return (activeIndex ?? 0) + 1 >= reasons.length ? 0 : (activeIndex ?? -1) + 1;
  }, [activeIndex, discovered, reasons.length]);

  const openReason = (index: number) => {
    setActiveIndex(index);
    setDiscovered((current) => {
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  const progress = Math.round((discovered.size / reasons.length) * 100);

  return (
    <div className="w-full">
      <header className="mb-8 text-center">
        <p className="eyebrow">Chapter two</p>
        <h3 className="serif-title mt-4 text-[clamp(2.4rem,6vw,4rem)]">{loveContent.reasonsHeading}</h3>
        <p className="soft-copy mx-auto mt-4 max-w-lg text-[13px] sm:text-[14px]">{loveContent.reasonsIntro}</p>
      </header>

      <div className="mx-auto mb-9 flex max-w-md items-center gap-4">
        <div className="h-px flex-1 bg-warmWhite/10">
          <motion.div
            className="h-px bg-gradient-to-r from-lavender to-blush shadow-[0_0_10px_rgba(243,166,200,0.6)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80">
          {discovered.size} / {reasons.length} found
        </span>
      </div>

      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-4 sm:gap-x-6 sm:gap-y-6">
        {reasons.map((_, index) => {
          const isFound = discovered.has(index);
          const isActive = activeIndex === index;
          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => openReason(index)}
              aria-label={isFound ? `Read reason ${index + 1} again` : `Discover reason ${index + 1}`}
              aria-pressed={isActive}
              className="relative grid h-[56px] w-[56px] place-items-center rounded-full sm:h-[68px] sm:w-[68px]"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: (index % 6) * 0.06 }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, index % 2 === 0 ? -8 : 7, 0],
                    }
              }
              whileHover={{ scale: 1.14 }}
              whileTap={{ scale: 0.92 }}
            >
              <span
                className={`absolute inset-[-6px] rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-blush/20 shadow-[0_0_32px_12px_rgba(243,166,200,0.25)]"
                    : isFound
                      ? "bg-lavender/10 shadow-[0_0_20px_6px_rgba(185,165,255,0.12)]"
                      : "bg-transparent"
                }`}
              />
              <svg viewBox="0 0 32 30" className="relative h-[30px] w-[32px] sm:h-[36px] sm:w-[38px]">
                <path
                  d="M16 28.5S2.5 20.7 2.5 11.2A7.7 7.7 0 0 1 16 7.1a7.7 7.7 0 0 1 13.5 4.1C29.5 20.7 16 28.5 16 28.5Z"
                  fill={isActive ? "#F3A6C8" : isFound ? "#B9A5FF" : "rgba(255,248,242,0.12)"}
                  stroke={isActive ? "#FFD6E6" : isFound ? "#D8CBFF" : "rgba(255,248,242,0.45)"}
                  strokeWidth="1"
                  className="transition-all duration-500"
                  style={{
                    filter: isActive
                      ? "drop-shadow(0 0 8px rgba(243,166,200,0.9))"
                      : isFound
                        ? "drop-shadow(0 0 5px rgba(185,165,255,0.6))"
                        : "none",
                  }}
                />
              </svg>
              {isFound && !isActive && (
                <span className="absolute bottom-0 h-1 w-1 rounded-full bg-gold/80" aria-hidden="true" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mx-auto mt-10 min-h-[190px] max-w-2xl" aria-live="polite">
        <AnimatePresence mode="wait">
          {activeIndex !== null ? (
            <motion.div
              key={activeIndex}
              className="relative rounded-[24px] border border-lavender/15 bg-[rgba(23,19,46,0.5)] px-7 py-8 text-center sm:px-12 sm:py-10"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.5 }}
            >
              <span className="absolute left-5 top-4 font-hand text-xl text-blush/70">
                reason {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <Sparkles size={16} className="mx-auto mb-5 text-gold/70" strokeWidth={1.4} />
              <p className="font-serif text-[clamp(1.35rem,3.6vw,2rem)] leading-[1.35] text-warmWhite/95">
                {reasons[activeIndex]}
              </p>
              <button
                type="button"
                onClick={() => openReason(nextUndiscovered)}
                className="button-ghost mt-7"
              >
                {discovered.size === reasons.length ? "Read another reason" : "Find another reason"}
              </button>
            </motion.div>
          ) : (
            <motion.p
              key="prompt"
              className="pt-10 text-center font-hand text-2xl text-warmWhite/45"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Choose a heart. There are {reasons.length} waiting for you.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
