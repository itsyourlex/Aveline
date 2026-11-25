import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import type { CSSProperties } from "react";
import { loveContent } from "../data/loveContent";

type WelcomeSectionProps = {
  onExplore: () => void;
};

export function WelcomeSection({ onExplore }: WelcomeSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="welcome" className="section-shell items-center text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.span
          className="star star-blush"
          style={{ left: "18%", top: "28%", width: 3, height: 3, "--opacity": 0.8 } as CSSProperties}
          animate={reduceMotion ? undefined : { y: [0, -18, 0], opacity: [0.35, 0.9, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="star star-lavender"
          style={{ left: "82%", top: "62%", width: 2.5, height: 2.5, "--opacity": 0.7 } as CSSProperties}
          animate={reduceMotion ? undefined : { y: [0, 14, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.span
          className="star"
          style={{ left: "72%", top: "19%", width: 2, height: 2, "--opacity": 0.6 } as CSSProperties}
          animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <div className="nebula left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(185,165,255,0.1),transparent_68%)]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.16 } },
        }}
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center"
      >
        <motion.p
          className="eyebrow mb-8"
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
        >
          A note, just for you
        </motion.p>

        <motion.h2
          className="serif-title glow-text text-[clamp(3.2rem,9vw,6.5rem)]"
          variants={{
            hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {loveContent.welcomeHeading}
        </motion.h2>

        <motion.div
          className="mt-9 h-16 w-px bg-gradient-to-b from-lavender/70 via-blush/40 to-transparent"
          variants={{ hidden: { opacity: 0, scaleY: 0 }, visible: { opacity: 1, scaleY: 1, transition: { duration: 1 } } }}
          style={{ originY: 0 }}
        />

        <motion.p
          className="soft-copy mt-8 max-w-xl text-[15px] leading-[1.9] sm:text-[17px]"
          variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
        >
          {loveContent.welcomeMessage}
        </motion.p>

        <motion.p
          className="mt-6 font-hand text-2xl text-blush/85 sm:text-[28px]"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1.2, delay: 0.2 } } }}
        >
          {loveContent.welcomeWhisper}
        </motion.p>

        <motion.button
          type="button"
          onClick={onExplore}
          className="button-primary mt-12 group"
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9 } } }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {loveContent.exploreButtonLabel}
          <ArrowDownRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
