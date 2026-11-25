import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import { loveContent, type PlanetContent } from "../data/loveContent";
import { Planet } from "./Planet";

export type PlanetId = PlanetContent["id"];

type UniverseSceneProps = {
  onOpenPlanet: (id: PlanetId) => void;
};

const desktopPositions: Record<PlanetId, CSSProperties> = {
  memories: { left: "11%", top: "14%" },
  reasons: { right: "11%", top: "12%" },
  letters: { left: "15%", bottom: "9%" },
  moments: { right: "15%", bottom: "8%" },
};

export function UniverseScene({ onOpenPlanet }: UniverseSceneProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="universe" className="section-shell min-h-[105vh] items-center overflow-hidden">
      <motion.div
        className="relative z-10 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
        }}
      >
        <div className="mx-auto mb-6 max-w-2xl text-center">
          <motion.p
            className="eyebrow"
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          >
            {loveContent.universeEyebrow}
          </motion.p>
          <motion.h2
            className="serif-title mt-5 text-[clamp(2.4rem,6vw,4.4rem)]"
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } }}
          >
            {loveContent.universeHeading}
          </motion.h2>
          <motion.p
            className="soft-copy mx-auto mt-5 max-w-lg text-[13px] sm:text-[15px]"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.2 } } }}
          >
            {loveContent.universeDescription}
          </motion.p>
        </div>

        {/* Desktop orbital system */}
        <div className="relative mx-auto mt-8 hidden h-[560px] w-full max-w-6xl md:block lg:h-[610px]">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            {[
              [150, 155],
              [850, 150],
              [180, 475],
              [820, 470],
            ].map(([x, y], index) => (
              <motion.line
                key={index}
                x1="500"
                y1="300"
                x2={x}
                y2={y}
                stroke="#B9A5FF"
                strokeOpacity="0.16"
                strokeWidth="1"
                strokeDasharray="3 7"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.35 + index * 0.12 }}
              />
            ))}
          </svg>

          <div className="orbit-ring absolute left-1/2 top-1/2 h-[300px] w-[660px] -translate-x-1/2 -translate-y-1/2" />
          <div className="orbit-ring absolute left-1/2 top-1/2 h-[430px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-60" />

          <motion.div
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="central-star block h-[104px] w-[104px] rounded-full lg:h-[122px] lg:w-[122px]"
              animate={reduceMotion ? undefined : { scale: [1, 1.045, 1], opacity: [0.92, 1, 0.92] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="mt-5 font-hand text-[24px] text-gold/90">{loveContent.nickname}</span>
          </motion.div>

          {loveContent.planets.map((planet, index) => (
            <div key={planet.id} className="absolute" style={desktopPositions[planet.id]}>
              <Planet planet={planet} delay={0.3 + index * 0.14} onOpen={() => onOpenPlanet(planet.id)} />
            </div>
          ))}
        </div>

        {/* Mobile / tablet accessible layout */}
        <div className="relative mx-auto mt-10 flex max-w-md flex-col items-center gap-10 md:hidden">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="central-star block h-[84px] w-[84px] rounded-full" />
            <span className="mt-4 font-hand text-xl text-gold/90">{loveContent.nickname}</span>
          </motion.div>
          <div className="grid w-full grid-cols-2 gap-x-5 gap-y-10">
            {loveContent.planets.map((planet, index) => (
              <Planet
                key={planet.id}
                planet={planet}
                compact
                delay={0.15 + index * 0.1}
                onOpen={() => onOpenPlanet(planet.id)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
