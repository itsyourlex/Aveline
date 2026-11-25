import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { loveContent } from "../data/loveContent";
import { generateStars } from "../lib/starMath";

type OpeningSceneProps = {
  onEnter: () => void;
};

export function OpeningScene({ onEnter }: OpeningSceneProps) {
  const reduceMotion = useReducedMotion();
  const [leaving, setLeaving] = useState(false);
  const stars = useMemo(() => generateStars(90, 404), []);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(onEnter, reduceMotion ? 120 : 1050);
    return () => window.clearTimeout(timer);
  }, [leaving, onEnter, reduceMotion]);

  const handleEnter = () => {
    if (leaving) return;
    setLeaving(true);
  };

  const words = loveContent.openingTitle.split(" ");

  return (
    <motion.section
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-midnight px-6"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0.15 : 1.1, ease: "easeInOut" } }}
      aria-label="Opening scene"
    >
      {/* Stars that later fly outward */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className={`star ${star.color === "white" ? "" : `star-${star.color}`}`}
            style={
              {
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                "--opacity": star.opacity,
                "--duration": `${star.duration}s`,
                "--delay": `${star.delay}s`,
              } as CSSProperties
            }
            initial={{ opacity: 0, scale: 0.2 }}
            animate={
              leaving
                ? {
                    opacity: 0,
                    x: (star.x - 50) * 9,
                    y: (star.y - 50) * 7,
                    scale: 1.4,
                  }
                : {
                    opacity: star.opacity,
                    scale: 1,
                  }
            }
            transition={{
              opacity: { delay: reduceMotion ? 0 : star.id * 0.018, duration: 1.2 },
              x: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.9 },
            }}
          />
        ))}

        {/* Crescent moon */}
        <motion.svg
          className="crescent absolute right-[12%] top-[13%] h-[74px] w-[74px] sm:right-[18%] sm:top-[16%] sm:h-[108px] sm:w-[108px]"
          viewBox="0 0 120 120"
          fill="none"
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{
            opacity: leaving ? 0 : 0.9,
            y: leaving ? -22 : 0,
            scale: 1,
          }}
          transition={{ delay: reduceMotion ? 0 : 0.85, duration: 1.5, ease: "easeOut" }}
        >
          <defs>
            <linearGradient id="openingMoon" x1="15" y1="10" x2="100" y2="110">
              <stop stopColor="#FFF8F2" />
              <stop offset="1" stopColor="#E8CB91" />
            </linearGradient>
          </defs>
          <path
            d="M78 12A49 49 0 1 0 108 91 46 46 0 0 1 78 12Z"
            fill="url(#openingMoon)"
          />
        </motion.svg>

        <div className="nebula left-1/2 top-1/2 h-[70vw] max-h-[720px] w-[70vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(104,74,170,0.16),transparent_68%)]" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        animate={{ opacity: leaving ? 0 : 1, y: leaving ? -18 : 0 }}
        transition={{ duration: reduceMotion ? 0.1 : 0.55 }}
      >
        <motion.p
          className="eyebrow mb-7"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 1.15, duration: 0.9 }}
        >
          For {loveContent.girlfriendName}
        </motion.p>

        <h1 className="serif-title glow-text text-[clamp(2.9rem,9vw,6.4rem)]" aria-label={loveContent.openingTitle}>
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="mr-[0.24em] inline-block last:mr-0"
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: reduceMotion ? 0 : 1.45 + index * 0.16,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-blush/60 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: reduceMotion ? 0 : 2.05, duration: 1.1 }}
        />

        <motion.p
          className="soft-copy mx-auto mt-8 max-w-md text-[13px] tracking-wide sm:text-[15px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 2.25, duration: 1 }}
        >
          {loveContent.openingMessage}
        </motion.p>

        <motion.button
          type="button"
          onClick={handleEnter}
          disabled={leaving}
          className="button-primary group mt-11 disabled:opacity-60"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 2.75, duration: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loveContent.enterButtonLabel}
          <ArrowDown size={13} className="transition-transform duration-300 group-hover:translate-y-0.5" />
        </motion.button>

        <motion.p
          className="mt-7 text-[9px] uppercase tracking-[0.24em] text-warmWhite/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : 3.4, duration: 1 }}
        >
          Sound is optional · always your choice
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
