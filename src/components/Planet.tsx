import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import type { PlanetContent } from "../data/loveContent";

type PlanetProps = {
  planet: PlanetContent;
  delay: number;
  compact?: boolean;
  onOpen: () => void;
};

export function Planet({ planet, delay, compact = false, onOpen }: PlanetProps) {
  const reduceMotion = useReducedMotion();
  const size = compact ? 94 : 116;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${planet.name}`}
      className="group flex flex-col items-center gap-3 rounded-2xl px-1 text-center"
      initial={{ opacity: 0, scale: 0.72 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
    >
      <motion.span
        className="relative block"
        style={{ width: size, height: size }}
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 7 + delay * 1.7, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <span
          className="planet-halo absolute inset-[-12px] rounded-full opacity-40 transition-opacity duration-500 group-hover:opacity-100"
          style={{ "--planet-glow": `${planet.color}55` } as CSSProperties}
        />
        <span
          className="planet-photo absolute inset-0 rounded-full transition-transform duration-500 group-hover:scale-[1.05]"
          style={
            {
              "--planet-ring": `${planet.color}99`,
              "--planet-ring-hover": planet.color,
              "--planet-glow": `${planet.color}55`,
              "--planet-glow-hover": `${planet.color}99`,
            } as CSSProperties
          }
        >
          <img
            src={planet.image}
            alt={`${planet.name} photograph`}
            draggable={false}
            className="h-full w-full rounded-full object-cover"
          />
          <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-midnight/25 via-transparent to-warmWhite/10" />
        </span>
        {planet.id === "moments" && (
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-[26px] w-[150%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-[50%] border border-warmWhite/35" />
        )}
        {planet.id === "reasons" && (
          <span className="pointer-events-none absolute -bottom-1 left-1/2 h-3 w-[70%] -translate-x-1/2 rounded-full border-b border-blush/40 blur-[1px]" />
        )}
      </motion.span>

      <span className="block">
        <span className="block font-serif text-[17px] tracking-wide text-warmWhite/95 transition-colors group-hover:text-warmWhite sm:text-[19px]">
          {planet.name}
        </span>
        <span className="mt-1 block text-[9px] uppercase tracking-[0.18em] text-warmWhite/40 transition-colors group-hover:text-lavender/80">
          {planet.subtitle}
        </span>
      </span>
    </motion.button>
  );
}
