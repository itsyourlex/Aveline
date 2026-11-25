import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, type CSSProperties } from "react";
import { generateParticles, generateStars } from "../lib/starMath";

type CelestialBackgroundProps = {
  revealed: boolean;
};

const shootingStars = [
  { top: "12%", left: "68%", duration: 11, delay: 2 },
  { top: "28%", left: "88%", duration: 14, delay: 7 },
  { top: "6%", left: "42%", duration: 17, delay: 11 },
];

export function CelestialBackground({ revealed }: CelestialBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const farY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -80]);
  const nearY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -170]);

  const stars = useMemo(() => generateStars(150, 2026), []);
  const particles = useMemo(() => generateParticles(26, 71), []);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: revealed ? 1 : 0.28 }}
      transition={{ duration: 2.2, ease: "easeOut" }}
    >
      {/* Atmospheric colour fields */}
      <div className="absolute inset-0 bg-midnight" />
      <motion.div style={{ y: farY }} className="absolute inset-[-12%]">
        <div className="nebula left-[-14%] top-[4%] h-[52vw] max-h-[720px] w-[52vw] max-w-[720px] bg-[radial-gradient(circle,rgba(75,55,140,0.3),transparent_68%)]" />
        <div className="nebula right-[-12%] top-[24%] h-[46vw] max-h-[640px] w-[46vw] max-w-[640px] bg-[radial-gradient(circle,rgba(160,76,126,0.16),transparent_68%)]" />
        <div className="nebula bottom-[-18%] left-[26%] h-[55vw] max-h-[760px] w-[55vw] max-w-[760px] bg-[radial-gradient(circle,rgba(52,74,143,0.2),transparent_70%)]" />
      </motion.div>

      {/* Distant stars */}
      <motion.div style={{ y: farY }} className="absolute inset-0">
        {stars.map((star) => (
          <span
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
          />
        ))}

        <svg
          className="absolute inset-0 h-full w-full opacity-[0.38]"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          fill="none"
        >
          <g stroke="#B9A5FF" strokeWidth="0.7" opacity="0.7">
            <polyline points="170,190 248,142 318,206 394,168 456,232" />
            <polyline points="1030,132 1108,96 1174,164 1252,128 1320,190" />
            <polyline points="620,760 690,708 772,742 842,686 910,724" />
          </g>
          <g fill="#FFF8F2">
            {[
              [170, 190],
              [248, 142],
              [318, 206],
              [394, 168],
              [456, 232],
              [1030, 132],
              [1108, 96],
              [1174, 164],
              [1252, 128],
              [1320, 190],
              [620, 760],
              [690, 708],
              [772, 742],
              [842, 686],
              [910, 724],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" opacity="0.9" />
            ))}
          </g>
        </svg>
      </motion.div>

      {/* Crescent moon */}
      <motion.div
        style={{ y: nearY }}
        className="absolute right-[6%] top-[9%] hidden sm:block"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: revealed ? 0.9 : 0.25, scale: 1 }}
        transition={{ duration: 2.4, delay: 0.4 }}
      >
        <svg className="crescent h-[100px] w-[100px] lg:h-[130px] lg:w-[130px]" viewBox="0 0 120 120" fill="none">
          <defs>
            <linearGradient id="moonGradient" x1="20" y1="10" x2="100" y2="110">
              <stop stopColor="#FFF8F2" />
              <stop offset="1" stopColor="#E8CB91" />
            </linearGradient>
          </defs>
          <path
            d="M78 12A49 49 0 1 0 108 91 46 46 0 0 1 78 12Z"
            fill="url(#moonGradient)"
            opacity="0.92"
          />
        </svg>
      </motion.div>

      {/* Near particles and shooting stars */}
      <motion.div style={{ y: nearY }} className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="float-particle"
            style={
              {
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                "--duration": `${particle.duration}s`,
                "--delay": `${particle.delay}s`,
                "--drift-x": `${particle.driftX}px`,
                "--drift-y": `${particle.driftY}px`,
              } as CSSProperties
            }
          />
        ))}
        {!reduceMotion &&
          shootingStars.map((shootingStar, index) => (
            <span
              key={index}
              className="shooting-star"
              style={
                {
                  top: shootingStar.top,
                  left: shootingStar.left,
                  "--duration": `${shootingStar.duration}s`,
                  "--delay": `${shootingStar.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
      </motion.div>
    </motion.div>
  );
}
