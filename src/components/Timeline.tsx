import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";
import { loveContent } from "../data/loveContent";

export function Timeline() {
  const reduceMotion = useReducedMotion();
  const moments = loveContent.timeline;
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToMoment = (index: number) => {
    if (index < 0 || index >= moments.length) return;
    setActiveIndex(index);
    itemRefs.current[index]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  };

  return (
    <div className="w-full">
      <header className="mb-12 text-center">
        <p className="eyebrow">Chapter four</p>
        <h3 className="serif-title mt-4 text-[clamp(2.4rem,6vw,4rem)]">{loveContent.momentsHeading}</h3>
        <p className="soft-copy mx-auto mt-4 max-w-lg text-[13px] sm:text-[14px]">{loveContent.momentsIntro}</p>
      </header>

      <div className="relative mx-auto max-w-3xl pl-9 sm:pl-12">
        <div className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-lavender/60 via-blush/35 to-transparent sm:left-[15px]" />

        {moments.map((moment, index) => (
          <motion.div
            key={moment.id}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className="relative pb-14 last:pb-0"
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={`absolute -left-[35px] top-2 grid h-[23px] w-[23px] place-items-center rounded-full border sm:-left-[47px] sm:h-[27px] sm:w-[27px] ${
                activeIndex === index
                  ? "border-blush/80 bg-blush/20 shadow-[0_0_20px_5px_rgba(243,166,200,0.22)]"
                  : "border-lavender/45 bg-violetNight"
              }`}
            >
              <span className={`h-[6px] w-[6px] rounded-full ${activeIndex === index ? "bg-blush" : "bg-lavender/70"}`} />
            </span>

            <button
              type="button"
              onClick={() => scrollToMoment(index)}
              className="group block w-full text-left"
              aria-label={`Go to moment ${index + 1}: ${moment.title}`}
            >
              <span className="eyebrow block text-gold/70">{moment.date}</span>
              <h4 className="serif-title mt-3 text-[28px] transition-colors group-hover:text-blush sm:text-[34px]">
                {moment.title}
              </h4>
              <p className="soft-copy mt-3 max-w-lg text-[13px] sm:text-[15px]">{moment.caption}</p>

              {moment.image && (
                <span className="mt-5 block max-w-[300px] overflow-hidden rounded-[4px] border border-warmWhite/10 bg-violetNight">
                  <img src={moment.image} alt={moment.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                </span>
              )}

              {moment.isSample && (
                <span className="mt-4 block text-[8px] uppercase tracking-[0.2em] text-gold/45">
                  Sample entry · replace in loveContent.ts
                </span>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-3xl items-center justify-between border-t border-warmWhite/10 pt-7">
        <button
          type="button"
          onClick={() => scrollToMoment(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="button-ghost disabled:cursor-not-allowed disabled:opacity-25"
        >
          <ChevronUp size={13} /> Previous
        </button>
        <span className="text-[10px] uppercase tracking-[0.2em] text-warmWhite/40">
          {String(activeIndex + 1).padStart(2, "0")} / {String(moments.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => scrollToMoment(activeIndex + 1)}
          disabled={activeIndex === moments.length - 1}
          className="button-ghost disabled:cursor-not-allowed disabled:opacity-25"
        >
          Next <ChevronDown size={13} />
        </button>
      </div>
    </div>
  );
}
