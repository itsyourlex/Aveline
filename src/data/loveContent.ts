/**
 * ✦ PERSONALIZATION FILE ✦
 * --------------------------------------------------------------------------
 * This is the single place to make the whole website yours.
 * Replace every value marked SAMPLE with your own words, photos and dates.
 * The components read from this file only — you never need to edit them.
 *
 * Photos: put replaceable gallery images in `public/images/` and use paths
 *         like "/images/our-first-date.jpg" below.
 * Planet photos are imported from `src/assets/` (img1–img4) and assigned to
 * the four planets below. Swap those files to change the planets.
 * Music:  `src/assets/music.mp3` is imported and used as `audioSrc`.
 *         See `public/audio/README.md` for alternatives.
 * --------------------------------------------------------------------------
 */

import planetPhoto1 from "../assets/img1.jpeg";
import planetPhoto2 from "../assets/img2.png";
import planetPhoto3 from "../assets/img3.png";
import planetPhoto4 from "../assets/img4.png";
import musicUrl from "../assets/music.mp3";

export type Memory = {
  id: string;
  /** Path to an image in public/images/ or a full URL. */
  image: string;
  caption: string;
  /** Short line under the caption. Optional. */
  note?: string;
  /** Set to false once the sample has been replaced. */
  isSample?: boolean;
};

export type Reason = string;

export type Letter = {
  id: string;
  title: string;
  message: string;
};

export type TimelineMoment = {
  id: string;
  /** Use your real date here, e.g. "June 14, 2024". */
  date: string;
  title: string;
  caption: string;
  /** Optional image path, e.g. "/images/timeline-1.jpg". */
  image?: string;
  isSample?: boolean;
};

export type PlanetContent = {
  id: "memories" | "reasons" | "letters" | "moments";
  name: string;
  subtitle: string;
  /** Circular photograph shown inside the planet. */
  image: string;
  /** Planet visual colour. */
  color: string;
  /** Planet visual accent colour. */
  accent: string;
};

export const loveContent = {
  // ── The people this universe was built for ─────────────────────────────
  girlfriendName: "Aveline", // Recipient
  senderName: "Lex", // Sender / writer of the letters
  nickname: "Aveline", // Small name used beneath the central star

  // ── Opening scene ───────────────────────────────────────────────────────
  openingTitle: "A Universe Made for You",
  openingMessage: "I made a little something for my favorite person.", // SAMPLE
  enterButtonLabel: "Enter Our Universe",

  // ── Welcome ─────────────────────────────────────────────────────────────
  welcomeHeading: "Hi, my love.", // SAMPLE
  welcomeMessage:
    "I wanted to make something special for you. A little place where I could put all the things I sometimes struggle to say.", // SAMPLE
  exploreButtonLabel: "Let's explore",
  welcomeWhisper: "For you, always.", // SAMPLE

  // ── The universe hub ─────────────────────────────────────────────────────
  universeEyebrow: "Our little universe",
  universeHeading: "Four little worlds, all made of us.", // SAMPLE
  universeDescription:
    "Touch a planet and step inside. Every one of them holds something I wanted you to have.", // SAMPLE
  backToUniverseLabel: "Back to the universe",

  // ── Quiet bridge before the finale ──────────────────────────────────────
  bridgeLine:
    "If you ever forget how much you mean to me, come back to this little sky.", // SAMPLE

  // ── Planet labels (visual only) ─────────────────────────────────────────
  planets: [
    {
      id: "memories",
      name: "Our Memories",
      subtitle: "Photographs worth keeping",
      image: planetPhoto1,
      color: "#B9A5FF",
      accent: "#6D5BB8",
    },
    {
      id: "reasons",
      name: "Reasons I Love You",
      subtitle: "A constellation of little truths",
      image: planetPhoto2,
      color: "#F3A6C8",
      accent: "#B85C8A",
    },
    {
      id: "letters",
      name: "Little Love Letters",
      subtitle: "Open me when…",
      image: planetPhoto3,
      color: "#E8CB91",
      accent: "#A98548",
    },
    {
      id: "moments",
      name: "Our Special Moments",
      subtitle: "The days that stayed with me",
      image: planetPhoto4,
      color: "#A9D8E8",
      accent: "#4C8299",
    },
  ] satisfies PlanetContent[],

  // ── Section 4: memories ─────────────────────────────────────────────────
  // SAMPLE IMAGES: replace each `image` path with your own photograph.
  memoriesHeading: "Our memories",
  memoriesIntro:
    "A few frames I never want to lose. Click a photograph to hold it a little closer.", // SAMPLE
  memories: [
    {
      id: "memory-1",
      image: "/images/memory-1.svg",
      caption: "The kind of ordinary day you'd want to keep forever.", // SAMPLE
      note: "Sample memory 01 — replace with your photo and caption.",
      isSample: true,
    },
    {
      id: "memory-2",
      image: "/images/memory-2.svg",
      caption: "Some conversations feel like they last a lifetime.", // SAMPLE
      note: "Sample memory 02 — replace with your photo and caption.",
      isSample: true,
    },
    {
      id: "memory-3",
      image: "/images/memory-3.svg",
      caption: "A small moment that felt bigger than it looked.", // SAMPLE
      note: "Sample memory 03 — replace with your photo and caption.",
      isSample: true,
    },
    {
      id: "memory-4",
      image: "/images/memory-4.svg",
      caption: "The way the light fell, and how you looked in it.", // SAMPLE
      note: "Sample memory 04 — replace with your photo and caption.",
      isSample: true,
    },
    {
      id: "memory-5",
      image: "/images/memory-5.svg",
      caption: "A place I'll always picture when I think of you.", // SAMPLE
      note: "Sample memory 05 — replace with your photo and caption.",
      isSample: true,
    },
    {
      id: "memory-6",
      image: "/images/memory-6.svg",
      caption: "One more frame in the story we're still writing.", // SAMPLE
      note: "Sample memory 06 — replace with your photo and caption.",
      isSample: true,
    },
  ] satisfies Memory[],

  // ── Section 5: reasons ──────────────────────────────────────────────────
  reasonsHeading: "Reasons I love you",
  reasonsIntro:
    "These are only the ones I could put into words. Tap a heart to let it speak.", // SAMPLE
  // SAMPLE: replace these 12 with your own reasons.
  reasons: [
    "I love the way you make ordinary days feel special.",
    "I love how your presence makes everything feel a little lighter.",
    "I love the little things you do without even realizing how much they mean to me.",
    "I love the way you listen — like the world can wait and this moment is enough.",
    "I love that you laugh with your whole heart.",
    "I love how you notice the things I hope nobody else will.",
    "I love your curiosity, and the way you pull me into your wonder.",
    "I love that even quiet evenings feel like an adventure with you.",
    "I love the way you look at me when you think I'm not paying attention.",
    "I love how you turn small plans into memories I keep replaying.",
    "I love that you make me want to be a softer, braver version of myself.",
    "I love you in every version of the day — the bright ones and the quiet ones.",
  ] satisfies Reason[],

  // ── Section 6: open when letters ────────────────────────────────────────
  lettersHeading: "Open when…",
  // Every letter is written to Aveline and signed by Lex.
  letterSignoff: "With all my love, Lex",
  lettersIntro:
    "Little envelopes for the days I can't be there in person. Choose the one you need.", // SAMPLE
  // SAMPLE: rewrite every message below in your own voice.
  letters: [
    {
      id: "letter-sad",
      title: "Open when you're sad",
      message:
        "My love, you don't have to be okay right now. Let yourself feel it all, and let me hold the weight of it with you. Even from far away, I'm sitting beside you in this. Breathe with me. The sky is still yours, and so am I. Always.",
    },
    {
      id: "letter-miss",
      title: "Open when you miss me",
      message:
        "I miss you too — probably before you even finished reading this. Close your eyes for a second and picture me thinking about you, which is, honestly, most of the time. Until I can hold you again, keep this little note close.",
    },
    {
      id: "letter-reassurance",
      title: "Open when you need reassurance",
      message:
        "Let me be very clear: you are not too much. You are not hard to love. You are the easiest person in the world to choose, every single day. Whatever doubt is whispering right now, it doesn't get the final word. I do. And I choose you.",
    },
    {
      id: "letter-sleep",
      title: "Open when you can't sleep",
      message:
        "The night is quiet, but you're not alone in it. I hope this finds you and slowly makes your shoulders drop. Think of the stars outside as tiny notes I sent you — one for every thought you shouldn't have to carry to bed. Rest, my love. I'll be here in the morning.",
    },
    {
      id: "letter-smile",
      title: "Open when you need a smile",
      message:
        "Remember that time we laughed until it hurt and neither of us could explain why? That's the kind of magic I'm sending you now. Also: I am permanently, embarrassingly, hopelessly on your side. Try not to smile. I dare you.",
    },
    {
      id: "letter-loved",
      title: "Open when you want to feel loved",
      message:
        "If you ever need proof, start here: I built a whole little universe just to tell you what you already mean to me. You are wanted. You are cherished. You are the person I'd look for in every crowd, in every lifetime, in every sky.",
    },
  ] satisfies Letter[],

  // ── Section 7: timeline ─────────────────────────────────────────────────
  momentsHeading: "Our special moments",
  momentsIntro:
    "The days that stayed with me. Add your real dates and stories below.", // SAMPLE
  // SAMPLE: add the real dates and captions. Delete sample entries freely.
  timeline: [
    {
      id: "moment-1",
      date: "SAMPLE DATE",
      title: "A moment worth adding",
      caption: "Replace this with the story of a day you'll never forget.",
      isSample: true,
    },
    {
      id: "moment-2",
      date: "SAMPLE DATE",
      title: "The beginning of something",
      caption: "Replace this with how it actually began — the real details matter most.",
      isSample: true,
    },
    {
      id: "moment-3",
      date: "SAMPLE DATE",
      title: "A day I keep returning to",
      caption: "Replace this with what made this day different from all the rest.",
      isSample: true,
    },
    {
      id: "moment-4",
      date: "SAMPLE DATE",
      title: "Somewhere I still picture",
      caption: "Replace this with a place, a feeling, or a photograph path.",
      image: "/images/timeline-1.svg",
      isSample: true,
    },
    {
      id: "moment-5",
      date: "SAMPLE DATE",
      title: "And every day after",
      caption: "Replace this with where you are now — this story is still being written.",
      isSample: true,
    },
  ] satisfies TimelineMoment[],

  // ── Section 8: final surprise ───────────────────────────────────────────
  finalHeading: "If the whole sky were mine…", // SAMPLE
  finalMessage: "Out of all the stars in the universe, I would still choose you.",
  finalLetterTitle: "A Letter for the End of the Universe",
  finalLetter:
    "Aveline,\n\nIf I could give you a universe, I wouldn't fill it with galaxies or grand gestures. I'd fill it with the things I love about you: the way you laugh, the way you care, and the way you make even an ordinary Tuesday feel like something worth remembering.\n\nThank you for being you. Thank you for staying, even during the moments when I was still trying to figure things out. Thank you for believing in me, especially during the times when I struggled to believe in myself.\n\nI know I'm not where I want to be in life just yet. There are still dreams I need to chase, goals I need to reach, and a better version of myself that I'm working hard to become. But there's one thing I'm certain about: when I finally become stable and ready to build the life I've always dreamed of, I want you beside me.\n\nAnd someday, when that day comes, I want to stand with you inside Manila Cathedral, look into your eyes, and make you my wife. Not just as a promise I've made today, but as a future I've worked hard to make possible.\n\nI can't promise that everything will always be easy, but I promise that I'll keep choosing you, growing with you, and doing my best to give us the future we deserve.\n\nIf I had to find you in every lifetime, under every sky, and in every universe, I would.\n\nAnd if there's one place I hope all my journeys lead me to, it's standing beside you, ready to spend the rest of my life with you.\n\nWith all my love,",
  finalSignature: "Lex",
  oneMoreButtonLabel: "One More Thing…",
  oneMoreMessage: "You are my favorite part of every universe.",
  replayButtonLabel: "Replay from the beginning",

  // ── Background music ────────────────────────────────────────────────────
  // Your supplied src/assets/music.mp3 is used. Set this to null to fall back
  // to the soft synthesized ambient pad.
  audioSrc: musicUrl as string | null,
  soundOnLabel: "Music playing",
  soundOffLabel: "Music paused",
  musicMutedLabel: "Music muted",
  muteLabel: "Mute music",
  unmuteLabel: "Unmute music",

  // ── Small closing line ──────────────────────────────────────────────────
  footerLine: "Made with all my heart, for you.", // SAMPLE
};

export type LoveContent = typeof loveContent;
