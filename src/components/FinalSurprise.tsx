import { motion, useInView, useReducedMotion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useRef, useState, type CSSProperties } from "react";
import { loveContent } from "../data/loveContent";
import { generateHeartOutlinePath, generateHeartPoints, mulberry32 } from "../lib/starMath";

type FinalSurpriseProps = {
  onReplay: () => void;
};

type AmbientStar = { id: number; x: number; y: number; size: number; opacity: number; targetX: number; targetY: number };
type HeartStar = { id: number; startX: number; startY: number; x: number; y: number; size: number };

export function FinalSurprise({ onReplay }: FinalSurpriseProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.16 });
  const [oneMoreVisible, setOneMoreVisible] = useState(false);

  const heartPath = useMemo(() => generateHeartOutlinePath(), []);

  const { ambientStars, heartStars } = useMemo(() => {
    const ambientRandom = mulberry32(314);
    const ambient: AmbientStar[] = Array.from({ length: 190 }, (_, id) => {
      const x = ambientRandom() * 600;
      const y = ambientRandom() * 420;
      return {
        id,
        x,
        y,
        size: 0.6 + ambientRandom() * 1.7,
        opacity: 0.25 + ambientRandom() * 0.75,
        targetX: x + (300 - x) * 0.09,
        targetY: y + (210 - y) * 0.09,
      };
    });

    const targetPoints = generateHeartPoints(98, 88);
    const starRandom = mulberry32(902);
    const hearts: HeartStar[] = targetPoints.map((point, id) => {
      const angle = starRandom() * Math.PI * 2;
      const radius = 230 + starRandom() * 170;
      return {
        id,
        startX: 300 + Math.cos(angle) * radius,
        startY: 210 + Math.sin(angle) * radius * 0.72,
        x: point.x,
        y: point.y,
        size: point.size,
      };
    });

    return { ambientStars: ambient, heartStars: hearts };
  }, []);

  const floatingHearts = useMemo(() => {
    const random = mulberry32(17);
    return Array.from({ length: 18 }, (_, id) => ({
      id,
      left: 4 + random() * 92,
      delay: random() * 3,
      duration: 6 + random() * 5,
      size: 10 + random() * 18,
      drift: (random() - 0.5) * 60,
    }));
  }, []);

  const d = (value: number) => (reduceMotion ? 0 : value);

  return (
    <section ref={sectionRef} id="final" className="relative overflow-hidden px-6 pb-24 pt-8 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,rgba(70,50,130,0.24),transparent_58%),linear-gradient(180deg,transparent,#090b1a_92%)]" />

      {/* Constellation stage */}
      <div className="pointer-events-none absolute inset-x-0 top-[1%] h-[46vh] min-h-[320px] sm:top-[3%] sm:h-[54vh]">
        <svg viewBox="0 0 600 420" className="h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="heartStroke" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#B9A5FF" />
              <stop offset="0.55" stopColor="#F3A6C8" />
              <stop offset="1" stopColor="#E8CB91" />
            </linearGradient>
          </defs>

          {ambientStars.map((star) => (
            <motion.circle
              key={`ambient-${star.id}`}
              fill="#FFF8F2"
              initial={{ cx: star.x, cy: star.y, r: star.size, opacity: reduceMotion ? star.opacity : 0 }}
              animate={
                isInView
                  ? {
                      cx: star.targetX,
                      cy: star.targetY,
                      opacity: star.opacity,
                    }
                  : {}
              }
              transition={{
                cx: { duration: d(2.6), delay: d(star.id * 0.008), ease: "easeOut" },
                cy: { duration: d(2.6), delay: d(star.id * 0.008), ease: "easeOut" },
                opacity: { duration: d(1.4), delay: d(star.id * 0.008) },
              }}
            />
          ))}

          <motion.path
            d={heartPath}
            fill="none"
            stroke="url(#heartStroke)"
            strokeWidth="1.1"
            strokeOpacity="0.55"
            filter="url(#heartGlow)"
            initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 0.55 : 0 }}
            animate={isInView ? { pathLength: 1, opacity: 0.55 } : {}}
            transition={{ duration: d(2.4), delay: d(1.7), ease: "easeInOut" }}
          />

          {heartStars.map((star) => (
            <motion.circle
              key={`heart-${star.id}`}
              className="final-heart-star"
              fill={star.id % 5 === 0 ? "#E8CB91" : star.id % 3 === 0 ? "#FFF8F2" : "#F3A6C8"}
              initial={{
                cx: reduceMotion ? star.x : star.startX,
                cy: reduceMotion ? star.y : star.startY,
                r: reduceMotion ? star.size : 0.4,
                opacity: reduceMotion ? 0.9 : 0,
              }}
              animate={
                isInView
                  ? {
                      cx: star.x,
                      cy: star.y,
                      r: star.size,
                      opacity: 0.92,
                    }
                  : {}
              }
              transition={{
                cx: { duration: d(2.3), delay: d(1.1 + star.id * 0.016), ease: [0.22, 1, 0.36, 1] },
                cy: { duration: d(2.3), delay: d(1.1 + star.id * 0.016), ease: [0.22, 1, 0.36, 1] },
                r: { duration: d(1.1), delay: d(2.4 + star.id * 0.014) },
                opacity: { duration: d(1.2), delay: d(1.5 + star.id * 0.016) },
              }}
            />
          ))}
        </svg>
      </div>

      {/* Final words */}
      <div className="relative z-10 mx-auto max-w-3xl pt-[45vh] text-center sm:pt-[53vh]">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: d(1), delay: d(2.7) }}
        >
          The last thing I want you to know
        </motion.p>

        <motion.h2
          className="serif-title glow-text mt-6 text-[clamp(2.2rem,6vw,4rem)]"
          initial={{ opacity: 0, y: 24, filter: reduceMotion ? "none" : "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: d(1.4), delay: d(3.1), ease: [0.22, 1, 0.36, 1] }}
        >
          {loveContent.finalMessage}
        </motion.h2>

        <motion.div
          className="mx-auto mt-9 h-px w-32 bg-gradient-to-r from-transparent via-blush/70 to-transparent"
          initial={{ scaleX: reduceMotion ? 1 : 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: d(1.2), delay: d(3.8) }}
        />

        <motion.div
          className="paper-texture relative mt-12 rounded-[6px] px-6 pb-10 pt-10 text-left text-[#3a2c3c] shadow-[0_28px_80px_rgba(0,0,0,0.5)] sm:px-12 sm:pb-12 sm:pt-12"
          initial={{ opacity: 0, y: 30, scaleY: reduceMotion ? 1 : 0.94 }}
          animate={isInView ? { opacity: 1, y: 0, scaleY: 1 } : {}}
          transition={{ duration: d(1.2), delay: d(4.1), ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
        >
          <span className="absolute left-6 top-4 font-hand text-[21px] text-[#b36f92] sm:left-10 sm:top-5">
            {loveContent.finalLetterTitle}
          </span>
          <p className="whitespace-pre-line font-serif text-[17px] leading-[1.85] sm:text-[20px]">
            {loveContent.finalLetter}
          </p>
          <p className="mt-8 text-right font-hand text-2xl text-[#b36f92]">{loveContent.finalSignature}</p>
        </motion.div>

        <motion.div
          className="mt-11 flex flex-col items-center gap-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: d(1), delay: d(4.6) }}
        >
          <button type="button" onClick={() => setOneMoreVisible(true)} className="button-primary group" disabled={oneMoreVisible}>
            {loveContent.oneMoreButtonLabel}
            <Sparkles size={13} className="transition-transform duration-500 group-hover:rotate-12" />
          </button>

          {oneMoreVisible && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: d(0.9), ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-hand text-[clamp(1.8rem,5vw,2.8rem)] leading-tight text-blush">
                {loveContent.oneMoreMessage}
              </p>
              <button type="button" onClick={onReplay} className="button-ghost mt-8">
                <RotateCcw size={13} /> {loveContent.replayButtonLabel}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating hearts and stars after the final reveal */}
      {oneMoreVisible && !reduceMotion && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
          {floatingHearts.map((heart) => (
            <motion.span
              key={heart.id}
              className="absolute bottom-[-30px] text-blush/60"
              style={
                {
                  left: `${heart.left}%`,
                  fontSize: heart.size,
                  filter: "drop-shadow(0 0 6px rgba(243,166,200,0.6))",
                } as CSSProperties
              }
              initial={{ y: 0, opacity: 0, x: 0 }}
              animate={{ y: -620, opacity: [0, 0.75, 0], x: heart.drift }}
              transition={{ duration: heart.duration, delay: heart.delay, repeat: Infinity, ease: "easeOut" }}
            >
              {heart.id % 3 === 0 ? "✦" : "♡"}
            </motion.span>
          ))}
        </div>
      )}
    </section>
  );
}
