import { motion, useReducedMotion } from "framer-motion";
import { Music, Volume2, VolumeX } from "lucide-react";
import { loveContent } from "../data/loveContent";

type MusicControlProps = {
  enabled: boolean;
  muted: boolean;
  onToggle: () => void;
  onToggleMute: () => void;
};

export function MusicControl({ enabled, muted, onToggle, onToggleMute }: MusicControlProps) {
  const reduceMotion = useReducedMotion();
  const isPlaying = enabled && !muted;
  const stateLabel = muted
    ? loveContent.musicMutedLabel
    : enabled
      ? loveContent.soundOnLabel
      : loveContent.soundOffLabel;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="fixed right-4 top-4 z-[80] flex items-center gap-1 rounded-full border border-warmWhite/15 bg-midnight/55 py-1 pl-1.5 pr-2 backdrop-blur-md transition-colors duration-300 hover:border-lavender/45 sm:right-7 sm:top-7 sm:pr-3"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={enabled}
        aria-label={stateLabel}
        title={stateLabel}
        className="flex items-center gap-2 rounded-full px-1.5 py-1 text-warmWhite/75 transition-colors duration-300 hover:text-warmWhite sm:px-2"
      >
        <span className="relative grid h-5 w-5 place-items-center">
          <motion.span
            animate={isPlaying && !reduceMotion ? { rotate: [0, -6, 0, 6, 0] } : { rotate: 0 }}
            transition={{ duration: 4.5, repeat: isPlaying ? Infinity : 0, ease: "easeInOut" }}
            className="grid place-items-center"
          >
            <Music size={15} strokeWidth={1.6} className={isPlaying ? "text-blush" : "text-warmWhite/70"} />
          </motion.span>
          {isPlaying && (
            <span className="music-bars absolute -bottom-0.5 left-1/2 -translate-x-1/2" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          )}
        </span>
        <span className="hidden text-[9px] uppercase tracking-[0.2em] sm:inline">{stateLabel}</span>
      </button>

      <span className="h-4 w-px bg-warmWhite/15" aria-hidden="true" />

      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? loveContent.unmuteLabel : loveContent.muteLabel}
        title={muted ? loveContent.unmuteLabel : loveContent.muteLabel}
        className="grid h-7 w-7 place-items-center rounded-full text-warmWhite/55 transition-colors duration-300 hover:bg-lavender/10 hover:text-warmWhite"
      >
        {muted ? <VolumeX size={13} strokeWidth={1.7} /> : <Volume2 size={13} strokeWidth={1.7} />}
      </button>
    </motion.div>
  );
}
