import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import { loveContent } from "../data/loveContent";

export function LoveLetters() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const letters = loveContent.letters;

  return (
    <div className="w-full">
      <header className="mb-10 text-center">
        <p className="eyebrow">Chapter three</p>
        <h3 className="serif-title mt-4 text-[clamp(2.4rem,6vw,4rem)]">{loveContent.lettersHeading}</h3>
        <p className="soft-copy mx-auto mt-4 max-w-lg text-[13px] sm:text-[14px]">{loveContent.lettersIntro}</p>
      </header>

      <AnimatePresence mode="wait">
        {activeIndex === null ? (
          <motion.div
            key="envelopes"
            className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.4 }}
          >
            {letters.map((letter, index) => (
              <motion.button
                key={letter.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open letter: ${letter.title}`}
                className="group flex w-full max-w-[260px] flex-col items-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                whileHover={{ scale: 1.04, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="envelope block w-full transition-shadow duration-500 group-hover:shadow-[0_24px_50px_rgba(243,166,200,0.16)]">
                  <span className="envelope-line block" />
                  <span className="envelope-flap block" />
                  <span className="envelope-seal">♡</span>
                </span>
                <span className="mt-5 font-serif text-[19px] text-warmWhite/90 transition-colors group-hover:text-blush">
                  {letter.title}
                </span>
                <span className="mt-2 text-[8px] uppercase tracking-[0.22em] text-gold/50">Tap to open</span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`letter-${activeIndex}`}
            className="relative mx-auto max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.35 }}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="button-ghost mb-8"
            >
              <ArrowLeft size={13} /> Back to envelopes
            </button>

            <div className="relative flex flex-col items-center">
              <div className="envelope envelope-open relative z-10 w-[150px] sm:w-[180px]">
                <span className="envelope-line block" />
                <span className="envelope-flap block" />
                <span className="envelope-seal">♡</span>
                <motion.span
                  className="paper-texture absolute left-[8%] top-[12%] z-[2] block h-[95%] w-[84%] rounded-[3px] shadow-[0_8px_16px_rgba(0,0,0,0.25)]"
                  initial={{ y: 12, scaleY: 0.2, opacity: 0 }}
                  animate={{ y: -64, scaleY: 1, opacity: 1 }}
                  transition={{ delay: reduceMotion ? 0 : 0.15, duration: reduceMotion ? 0.1 : 0.75, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 1 }}
                />
              </div>

              <motion.article
                className="paper-texture relative z-0 -mt-10 w-full rounded-[6px] px-6 pb-9 pt-16 text-[#3a2c3c] shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:px-12 sm:pt-20"
                initial={{ opacity: 0, y: -18, scaleY: 0.82 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                transition={{ delay: reduceMotion ? 0 : 0.45, duration: reduceMotion ? 0.1 : 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ originY: 0 }}
              >
                <span className="absolute left-5 top-5 font-hand text-[22px] text-[#b36f92] sm:left-8 sm:top-6">
                  {loveContent.girlfriendName},
                </span>
                <h4 className="mb-7 text-center font-serif text-[26px] italic sm:text-[32px]">
                  {letters[activeIndex].title}
                </h4>
                <p className="whitespace-pre-line font-serif text-[18px] leading-[1.8] sm:text-[21px]">
                  {letters[activeIndex].message}
                </p>
                <div className="mt-9 flex items-center gap-3">
                  <span className="h-px flex-1 bg-[#8d6b78]/25" />
                  <span className="font-hand text-xl text-[#b36f92]">{loveContent.letterSignoff}</span>
                  <span className="h-px flex-1 bg-[#8d6b78]/25" />
                </div>

                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="absolute right-4 top-4 rounded-full p-2 text-[#6f5563] transition-colors hover:bg-[#6f5563]/10 hover:text-[#3a2c3c]"
                  aria-label="Close letter"
                >
                  <X size={18} />
                </button>
              </motion.article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
