/**
 * ─────────────────────────────────────────────────────────────
 * Edit this file to personalise the album.
 * You do not need to change the page components.
 *
 * Photos
 *   Real photos live in /public/memory/
 *   Change the `image` path below to match your filename.
 *
 * Each memory can include:
 *   image     "/memory/first-meet.jpg"
 *   date      optional / unused under photos now
 *   caption   handwritten line under a polaroid
 *   memory    the longer line in the full-screen chapter
 *   location  soft label in the full-screen chapter
 *   note      short line under the photo (instead of a date)
 *   chapter   where it appears (see below)
 *   frame     "portrait" | "square" | "landscape"  (optional)
 *   tilt      rotation in degrees (optional)
 *
 * Chapters
 *   started  Oldest photos, large polaroids. Keep these first.
 *   moments  Scrapbook page. Leave `image` off to make a handwritten note.
 *   keep     Full-screen memories, one at a time as you scroll.
 *   random   The playful photos.
 *   now      Newest photos. The first image is the large portrait.
 *   finale   The hidden last photograph.
 *
 * Secret Letters
 *   Edit secretLetters[] — sealed envelopes that open on tap.
 *
 * Love Coupons
 *   Edit loveCoupons[] — virtual coupons with Redeem animation.
 *
 * Night Sky
 *   Photos: /public/memory/sky/*
 *   Edit nightSkyStars[] for each star's memory.
 *
 * Music
 *   File: /public/song/Oru-Devadhai.mp3
 *   It never plays until the music button is tapped.
 *
 * Password
 *   Asked every time the site opens (first screen).
 *   Edit secretGate.password in this file (currently "feb5").
 * ─────────────────────────────────────────────────────────────
 */

export type ChapterId =
  | "started"
  | "moments"
  | "keep"
  | "random"
  | "now"
  | "finale";

export type Frame = "portrait" | "square" | "landscape";

export type Memory = {
  id: string;
  chapter: ChapterId;
  image?: string;
  date?: string;
  caption?: string;
  memory?: string;
  location?: string;
  note?: string;
  frame?: Frame;
  tilt?: number;
};

export type LittleThing = {
  id: string;
  title: string;
  line: string;
};

export type SecretLetter = {
  id: string;
  seal: string;
  letter: string;
};

export type LoveCoupon = {
  id: string;
  title: string;
  detail: string;
  redeemedNote: string;
};

export type NightSkyStar = {
  id: string;
  image: string;
  date: string;
  memory: string;
  /** Position on the sky, percent 0–100 */
  x: number;
  y: number;
  size?: number;
};

export const album = {
  title: "Our Little Story",
  subtitle: "A collection of the moments I never want to forget…",
  dedication: "for Sathu",
  from: "with love, Ezhil",
  names: {
    him: "Sathu",
    her: "Ezhil",
    us: "Sathu & Ezhil",
  },
  years: "almost 7 years of Sathu & Ezhil",
  open: "Open Our Album",
};

export const music = {
  src: "/song/Oru-Devadhai.mp3",
};

export const secretGate = {
  line: "Only one person is allowed into this album…",
  onlyFor: "Made only for Sathu",
  hintLabel: "Password hint",
  hint: "The date that changed everything.",
  placeholder: "enter the password",
  submit: "Enter",
  wrong: "That isn't it… try again.",
  /** Change this anytime — comparison is case-insensitive. */
  password: "feb5",
};

export const chapterMeta = {
  started: {
    number: "01",
    title: "Where It Started",
    intro: "Almost seven years ago… the first pages of us.",
  },
  moments: {
    number: "02",
    title: "Our Little Moments",
    intro:
      "It's not always the big moments… sometimes it's these little ones.",
  },
  keep: {
    number: "03",
    title: "Memories I Keep",
    intro: "The days I still hold close — including the day you asked.",
  },
  random: {
    number: "04",
    title: "The Random Us",
    intro: "The pages we never posed for.",
  },
  things: {
    number: "05",
    title: "The Little Things I Love About You",
    hint: "open a note",
  },
  letters: {
    number: "06",
    title: "Secret Letters",
    intro: "Sealed for the days you need me close.",
    hint: "open an envelope",
  },
  coupons: {
    number: "07",
    title: "Digital Love Coupons",
    intro: "Little promises you can cash in anytime.",
    hint: "tap redeem",
  },
  sky: {
    number: "08",
    title: "Our Night Sky",
    intro: "Each star is a memory. Tap one to remember.",
    connect: "Watch our stars find each other",
    constellation: "Sathu & Ezhil",
  },
  now: {
    number: "09",
    title: "Us, Now",
  },
} as const;

export const usNowCopy = {
  line1: "Almost seven years of loving you, Sathu…",
  line2: "…and a whole marriage still waiting for us.",
};

export const finaleCopy = {
  wait: "Wait… there's one more thing.",
  open: "Open the last page",
  line1: "If I could live it all again…",
  line2: "I'd still choose you, Sathu.",
  line3:
    "From the day you proposed, to the day we said forever — happy memories with you are my favourite memories.",
  signOff: "Always yours, Ezhil",
  replay: "Replay Our Story",
};

export const memories: Memory[] = [
  {
    id: "started-1",
    chapter: "started",
    image: "/memory/first-meet.jpg",
    caption: "And somehow, this became Sathu & Ezhil.",
    note: "the first page of our story",
  },
  {
    id: "started-2",
    chapter: "started",
    image: "/memory/class-bench.jpg",
    caption: "One of the moments that started everything.",
    note: "back when it was still a secret smile between Sathu & Ezhil",
  },
  {
    id: "started-3",
    chapter: "started",
    image: "/memory/IMG-20230214-WA0025.jpg",
    caption: "I didn't know then how special this would become.",
    note: "just us, figuring it out",
  },
  {
    id: "started-4",
    chapter: "started",
    image: "/memory/IMG-20230415-WA0075.jpg",
    caption: "Before we had a name for any of it.",
    note: "and somehow it already felt like home",
  },
  {
    id: "moments-1",
    chapter: "moments",
    image: "/memory/1682852212586.jpg",
    caption: "The long way home.",
    note: "I never minded the longer road with you",
  },
  {
    id: "moments-note-1",
    chapter: "moments",
    note: "You were humming. I pretended not to notice, so you wouldn't stop.",
  },
  {
    id: "moments-2",
    chapter: "moments",
    image: "/memory/IMG-20230530-WA0069.jpg",
    caption: "Sunday, barely afternoon.",
    note: "nothing planned — just perfect",
    frame: "square",
  },
  {
    id: "moments-3",
    chapter: "moments",
    image: "/memory/IMG-20230610-WA0027.jpg",
    caption: "That trip to my friend's house.",
    note: "helmets on, hearts loud",
  },
  {
    id: "moments-note-2",
    chapter: "moments",
    note: "Some ordinary Tuesday I still think about.",
  },
  {
    id: "moments-4",
    chapter: "moments",
    image: "/memory/IMG_0690.jpg",
    caption: "I kept this one.",
    note: "because it still feels like us",
  },
  {
    id: "keep-1",
    chapter: "keep",
    image: "/memory/full1.jpg",
    caption: "That day…",
    memory: "I still remember how happy we were.",
    location: "a day I still go back to",
  },
  {
    id: "keep-2",
    chapter: "keep",
    image: "/memory/full2.jpg",
    caption: "The quiet one.",
    memory:
      "We didn't do anything remarkable. I remember it anyway.",
    note: "You reached for my hand under the table.",
    location: "one of the soft ones",
  },
  {
    id: "keep-3",
    chapter: "keep",
    image: "/memory/fall3.jpg",
    caption: "The day you asked.",
    memory: "You proposed… and my whole forever started answering yes.",
    location: "the day everything changed",
  },
  {
    id: "keep-4",
    chapter: "keep",
    image: "/memory/full4.jpg",
    caption: "Almost ours.",
    memory: "I already knew — I was going to marry you.",
    location: "right before forever",
  },
  {
    id: "random-1",
    chapter: "random",
    image: "/memory/Snapchat-547736301.jpg",
    caption: "Us being us 😂",
    note: "no filter, no explanation",
    tilt: -5,
  },
  {
    id: "random-2",
    chapter: "random",
    image: "/memory/Snapchat-450355390.jpg",
    caption: "No explanation needed.",
    note: "this one still makes me laugh",
    frame: "landscape",
    tilt: 4.5,
  },
  {
    id: "random-3",
    chapter: "random",
    image: "/memory/Snapchat-1748262138.jpg",
    caption: "One of my favourite random memories.",
    note: "caught in the middle of nowhere, somehow happy",
    tilt: -3.5,
  },
  {
    id: "random-4",
    chapter: "random",
    image: "/memory/Snapchat-698488598.jpg",
    caption: "Still makes me smile.",
    note: "exactly the kind of us I love",
    tilt: 5,
  },
  {
    id: "now-1",
    chapter: "now",
    image: "/memory/f0135424.jpg",
    caption: "Us, after saying forever.",
    note: "married, and still learning each other",
  },
  {
    id: "now-2",
    chapter: "now",
    image: "/memory/IMG-20240205-WA0191.jpg",
    caption: "The yes that still echoes.",
    note: "the day you asked me to be yours",
  },
  {
    id: "now-3",
    chapter: "now",
    image: "/memory/IMG-20240218-WA0021.jpg",
    caption: "Still choosing you.",
    note: "a year of marriage, and counting",
  },
  {
    id: "finale-1",
    chapter: "finale",
    image: "/memory/us-wedding.jpg",
    caption: "The day we became forever.",
    note: "our wedding day — and every day after",
    memory: "Our wedding day — and the beginning of the rest of our little story.",
  },
];

export const littleThings: LittleThing[] = [
  {
    id: "smile",
    title: "Your smile",
    line: "The one you try to hide, and the one you don't.",
  },
  {
    id: "care",
    title: "The way you care",
    line: "Quietly. Without needing it to be seen.",
  },
  {
    id: "ordinary",
    title: "Coming home to you",
    line: "After almost seven years, the best part of any day is still knowing you're there.",
  },
  {
    id: "conversations",
    title: "Our random conversations",
    line: "The ones that begin with nothing and end with us still talking in the dark.",
  },
  {
    id: "little",
    title: "The little things you do without noticing",
    line: "I notice. I keep them all in here.",
  },
];

export const secretLetters: SecretLetter[] = [
  {
    id: "miss",
    seal: "Open when you miss me",
    letter:
      "If you're reading this because you miss me — I miss you too, Sathu. Come home to me in your mind for a second. I'm already there, waiting for you.",
  },
  {
    id: "tired",
    seal: "Open when you're tired",
    letter:
      "You don't have to carry today alone. Rest. I've got you. Even from here, I'm proud of how hard you try.",
  },
  {
    id: "smile",
    seal: "Open when you need a smile",
    letter:
      "Remember us being ridiculous for no reason? That version of us is still here. I hope this finds you mid-laugh — or at least mid-almost-laugh.",
  },
  {
    id: "feel",
    seal: "Open when you want to know what I feel",
    letter:
      "I feel safe with you. Chosen. Soft. And still a little stunned that almost seven years later, my favourite place in the world is still wherever you are, Sathu.",
  },
];

export const loveCoupons: LoveCoupon[] = [
  {
    id: "movie",
    title: "One Movie Night",
    detail: "Blankets, snacks, and no phones — just us.",
    redeemedNote: "Movie night claimed. Pick the film… or let me surprise you.",
  },
  {
    id: "date",
    title: "One Date Night",
    detail: "Wherever you want. I'm already saying yes.",
    redeemedNote: "Date night unlocked. Tell me when — I'll be ready.",
  },
  {
    id: "dinner",
    title: "One Favourite Dinner",
    detail: "Your favourite, cooked with care (and a little love).",
    redeemedNote: "Dinner's on me. Craving anything special?",
  },
  {
    id: "hug",
    title: "One Long Hug",
    detail: "No rush. No timers. Just hold on.",
    redeemedNote: "Hug redeemed. Come here — I'm not letting go yet.",
  },
  {
    id: "surprise",
    title: "One Surprise From Me",
    detail: "Something small. Something yours. Something sweet.",
    redeemedNote: "Surprise claimed. Now you wait… and I plan.",
  },
  {
    id: "anytime",
    title: "Redeem Anytime",
    detail: "No expiry. No fine print. Just love.",
    redeemedNote: "Anytime coupon used. Whatever you need — I'm here.",
  },
];

export const nightSkyStars: NightSkyStar[] = [
  {
    id: "sky-1",
    image: "/memory/sky/IMG-20220320-WA0048.jpg",
    date: "the beginning",
    memory: "The first spark — before we knew what we were becoming.",
    x: 18,
    y: 28,
    size: 1.1,
  },
  {
    id: "sky-2",
    image: "/memory/sky/IMG-20230320-WA0107.jpg",
    date: "class days",
    memory: "Ordinary hours that somehow felt like destiny.",
    x: 42,
    y: 18,
    size: 0.9,
  },
  {
    id: "sky-3",
    image: "/memory/sky/IMG-20230320-WA0108.jpg",
    date: "a soft evening",
    memory: "I looked at you and thought — this is home.",
    x: 68,
    y: 26,
    size: 1.05,
  },
  {
    id: "sky-4",
    image: "/memory/sky/IMG-20230517-WA0170.jpg",
    date: "one quiet Sunday",
    memory: "Nothing special happened. I remember it anyway.",
    x: 82,
    y: 44,
    size: 0.85,
  },
  {
    id: "sky-5",
    image: "/memory/sky/IMG-20240122-WA0150.jpg",
    date: "that day",
    memory: "One of the memories I keep closest to my chest.",
    x: 55,
    y: 48,
    size: 1.2,
  },
  {
    id: "sky-6",
    image: "/memory/sky/f2426368.jpg",
    date: "us being us",
    memory: "The silly ones. The real ones. My favourites.",
    x: 28,
    y: 58,
    size: 0.95,
  },
  {
    id: "sky-7",
    image: "/memory/sky/f14366208.jpg",
    date: "us, now",
    memory: "Still choosing each other under the same sky.",
    x: 72,
    y: 66,
    size: 1,
  },
  {
    id: "sky-8",
    image: "/memory/sky/DSC06496-1.jpg",
    date: "February 9, 2025",
    memory: "The night we became forever — Sathu & Ezhil.",
    x: 48,
    y: 78,
    size: 1.25,
  },
];

export function entriesFor(chapter: ChapterId) {
  return memories.filter((entry) => entry.chapter === chapter);
}
