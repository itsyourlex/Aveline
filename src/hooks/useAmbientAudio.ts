import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "universe-sound-preference";
const MUTED_KEY = "universe-sound-muted";
const FILE_VOLUME = 0.45;
const SYNTH_VOLUME = 0.038;

type SynthNodes = {
  master: GainNode;
  filter: BiquadFilterNode;
  oscillators: OscillatorNode[];
  lfo: OscillatorNode;
  lfoDepth: GainNode;
};

/**
 * Optional background audio.
 * - Uses the supplied `audioSrc` when available (your music.mp3).
 * - Falls back to a gentle synthesized ambient pad if the file fails.
 * - Playback is continuous: the audio element lives here, above all sections.
 * - Nothing is ever played before an explicit user gesture.
 */
export function useAmbientAudio(audioSrc: string | null) {
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(false);

  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const synthRef = useRef<SynthNodes | null>(null);
  const startedRef = useRef(false);
  const mutedRef = useRef(false);
  const suspendTimerRef = useRef<number | null>(null);

  const clearSuspendTimer = useCallback(() => {
    if (suspendTimerRef.current !== null) {
      window.clearTimeout(suspendTimerRef.current);
      suspendTimerRef.current = null;
    }
  }, []);

  const createSynth = useCallback(() => {
    const AudioContextClass =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0;

    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 760;
    filter.Q.value = 0.4;

    master.connect(filter);
    filter.connect(context.destination);

    // A soft, slowly breathing major chord — low and unobtrusive.
    const frequencies = [110, 164.81, 220, 277.18];
    const oscillators = frequencies.map((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index % 2 === 0 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index % 2 === 0 ? -3 : 4;

      const voiceGain = context.createGain();
      voiceGain.gain.value = index === 0 ? 0.42 : 0.2;
      oscillator.connect(voiceGain);
      voiceGain.connect(master);
      oscillator.start();
      return oscillator;
    });

    const lfo = context.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.07;
    const lfoDepth = context.createGain();
    lfoDepth.gain.value = mutedRef.current ? 0 : 0.012;
    lfo.connect(lfoDepth);
    lfoDepth.connect(master.gain);
    lfo.start();

    contextRef.current = context;
    synthRef.current = { master, filter, oscillators, lfo, lfoDepth };
  }, []);

  const start = useCallback(async () => {
    clearSuspendTimer();

    if (audioSrc) {
      if (!audioElementRef.current) {
        const element = new Audio(audioSrc);
        element.loop = true;
        element.preload = "auto";
        element.muted = mutedRef.current;
        element.volume = mutedRef.current ? 0 : FILE_VOLUME;
        element.style.display = "none";
        element.setAttribute("aria-hidden", "true");
        document.body.appendChild(element);
        audioElementRef.current = element;
      }
      const element = audioElementRef.current;
      element.muted = mutedRef.current;
      element.volume = mutedRef.current ? 0 : FILE_VOLUME;
      try {
        await element.play();
        startedRef.current = true;
      } catch {
        // Missing or blocked audio: fall back to the synthesized pad.
        if (!synthRef.current) createSynth();
        const context = contextRef.current;
        const synth = synthRef.current;
        if (!context || !synth) return;
        if (context.state === "suspended") await context.resume();
        synth.master.gain.cancelScheduledValues(context.currentTime);
        synth.master.gain.setValueAtTime(synth.master.gain.value, context.currentTime);
        synth.master.gain.linearRampToValueAtTime(
          mutedRef.current ? 0 : SYNTH_VOLUME,
          context.currentTime + 1.6,
        );
        if (synth.lfoDepth) synth.lfoDepth.gain.value = mutedRef.current ? 0 : 0.012;
        startedRef.current = true;
      }
      return;
    }

    if (!synthRef.current) createSynth();
    const context = contextRef.current;
    const synth = synthRef.current;
    if (!context || !synth) return;

    if (context.state === "suspended") await context.resume();
    synth.master.gain.cancelScheduledValues(context.currentTime);
    synth.master.gain.setValueAtTime(synth.master.gain.value, context.currentTime);
    synth.master.gain.linearRampToValueAtTime(
      mutedRef.current ? 0 : SYNTH_VOLUME,
      context.currentTime + 1.8,
    );
    synth.lfoDepth.gain.value = mutedRef.current ? 0 : 0.012;
    startedRef.current = true;
  }, [audioSrc, clearSuspendTimer, createSynth]);

  const stop = useCallback(() => {
    clearSuspendTimer();
    startedRef.current = false;
    // Pause preserves currentTime, so the track never restarts on navigation.
    audioElementRef.current?.pause();

    const context = contextRef.current;
    const synth = synthRef.current;
    if (!context || !synth) return;

    synth.master.gain.cancelScheduledValues(context.currentTime);
    synth.master.gain.setValueAtTime(synth.master.gain.value, context.currentTime);
    synth.master.gain.linearRampToValueAtTime(0, context.currentTime + 0.6);
    suspendTimerRef.current = window.setTimeout(() => {
      if (!startedRef.current && context.state === "running") void context.suspend();
      suspendTimerRef.current = null;
    }, 750);
  }, [clearSuspendTimer]);

  /** Play / pause. */
  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      // Storage can be unavailable in private browsing; sound still works.
    }
    if (next) void start();
    else stop();
  }, [enabled, start, stop]);

  /** Mute / unmute without interrupting playback. */
  const toggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    try {
      sessionStorage.setItem(MUTED_KEY, next ? "on" : "off");
    } catch {
      // Ignore unavailable storage.
    }

    const element = audioElementRef.current;
    if (element) {
      element.muted = next;
      element.volume = next ? 0 : FILE_VOLUME;
    }

    const context = contextRef.current;
    const synth = synthRef.current;
    if (context && synth && enabled) {
      synth.master.gain.cancelScheduledValues(context.currentTime);
      synth.master.gain.setValueAtTime(synth.master.gain.value, context.currentTime);
      synth.master.gain.linearRampToValueAtTime(
        next ? 0 : SYNTH_VOLUME,
        context.currentTime + 0.35,
      );
      synth.lfoDepth.gain.value = next ? 0 : 0.012;
    }
  }, [enabled]);

  // Restore session preferences, but never start audio automatically.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "on") setEnabled(true);
      if (sessionStorage.getItem(MUTED_KEY) === "on") {
        mutedRef.current = true;
        setMuted(true);
      }
    } catch {
      // Ignore unavailable storage.
    }
  }, []);

  // If a previous session left music "on", begin on the visitor's next
  // explicit interaction — never on page load.
  useEffect(() => {
    if (!enabled || startedRef.current) return;

    const onGesture = () => {
      void start();
    };
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [enabled, start]);

  useEffect(() => {
    return () => {
      clearSuspendTimer();
      audioElementRef.current?.pause();
      audioElementRef.current?.remove();
      audioElementRef.current = null;
      synthRef.current?.oscillators.forEach((oscillator) => oscillator.stop());
      synthRef.current?.lfo.stop();
      void contextRef.current?.close();
      // Allow a fresh engine to be created during development StrictMode.
      synthRef.current = null;
      contextRef.current = null;
      startedRef.current = false;
    };
  }, [clearSuspendTimer]);

  return { enabled, muted, toggle, toggleMute };
}
