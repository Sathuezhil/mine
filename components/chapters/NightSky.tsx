"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  album,
  chapterMeta,
  nightSkyStars,
  type NightSkyStar,
} from "@/data/album";
import { Heart } from "../scrapbook";

/** Star resting spots that trace a heart (percent coords) */
const HEART_POINTS: { x: number; y: number }[] = [
  { x: 50, y: 76 },
  { x: 30, y: 58 },
  { x: 20, y: 38 },
  { x: 30, y: 24 },
  { x: 50, y: 36 },
  { x: 70, y: 24 },
  { x: 80, y: 38 },
  { x: 70, y: 58 },
];

const HEART_PATH =
  "M50 78 C22 58 14 36 28 22 C38 14 47 20 50 34 C53 20 62 14 72 22 C86 36 78 58 50 78 Z";

export function NightSky() {
  const meta = chapterMeta.sky;
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<NightSkyStar | null>(null);
  const [constellation, setConstellation] = useState(false);

  const allOpened = opened.size >= nightSkyStars.length;
  const bgStars = useMemo(() => makeBackgroundStars(56), []);

  function openStar(star: NightSkyStar) {
    setActive(star);
    setOpened((prev) => new Set(prev).add(star.id));
  }

  function closeStar() {
    const wasLast = active && opened.size >= nightSkyStars.length;
    setActive(null);
    if (wasLast && !constellation) {
      window.setTimeout(() => setConstellation(true), reduce ? 120 : 480);
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#07060c] text-[#f6efe8]">
      <div className="photo-grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />

      <header className="relative z-10 mx-auto max-w-lg px-6 pt-20 pb-6 text-center">
        <p className="font-serif text-[0.68rem] tracking-[0.42em] text-[#d7bc86]/70 uppercase">
          Chapter {meta.number}
        </p>
        <h2 className="mt-3 font-hand text-[clamp(2.45rem,10vw,3.35rem)] leading-[1.02] font-medium text-[#f3e6c8]">
          {meta.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[18rem] font-serif text-xl leading-snug text-[#e4d2ae]/80 italic">
          {meta.intro}
        </p>
      </header>

      <div className="relative mx-auto min-h-[78svh] w-full max-w-3xl px-3 pb-28 sm:min-h-[85svh]">
        <div
          className="pointer-events-none absolute inset-0 rounded-[1.5rem]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 8%, rgba(90,70,130,0.32), transparent 55%), radial-gradient(ellipse at 78% 82%, rgba(130,45,70,0.2), transparent 48%), linear-gradient(180deg, #0b0a14 0%, #130e1c 52%, #09080f 100%)",
          }}
        />

        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.5rem]">
          {bgStars.map((s) => (
            <span
              key={s.id}
              className={`absolute rounded-full bg-white ${reduce ? "" : "sky-twinkle"}`}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                opacity: s.opacity,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <AnimatePresence>
            {constellation && (
              <motion.path
                d={HEART_PATH}
                fill="none"
                stroke="rgba(243,230,200,0.55)"
                strokeWidth="0.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: reduce ? 0.25 : 2.4, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>

          {!constellation &&
            nightSkyStars.map((star, index) => {
              if (index === 0) return null;
              const prev = nightSkyStars[index - 1];
              const lit = opened.has(star.id) && opened.has(prev.id);
              if (!lit) return null;
              return (
                <motion.line
                  key={`${prev.id}-${star.id}`}
                  x1={prev.x}
                  y1={prev.y}
                  x2={star.x}
                  y2={star.y}
                  stroke="rgba(232,210,170,0.38)"
                  strokeWidth="0.28"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.55 }}
                />
              );
            })}
        </svg>

        {nightSkyStars.map((star, index) => {
          const isOpen = opened.has(star.id);
          const size = (star.size ?? 1) * 14;
          const heart = HEART_POINTS[index % HEART_POINTS.length];
          const x = constellation ? heart.x : star.x;
          const y = constellation ? heart.y : star.y;

          return (
            <motion.button
              key={star.id}
              type="button"
              aria-label={`Open memory: ${star.date}`}
              onClick={() => !constellation && openStar(star)}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 touch-manipulation"
              initial={false}
              animate={{ left: `${x}%`, top: `${y}%` }}
              transition={{
                duration: reduce ? 0.2 : 1.5,
                ease: [0.22, 1, 0.36, 1],
                delay: constellation ? index * 0.05 : 0,
              }}
              whileTap={constellation ? undefined : { scale: 0.9 }}
              style={{ width: size + 22, height: size + 22 }}
            >
              {!reduce && (
                <span
                  className="sky-pulse pointer-events-none absolute inset-0 m-auto"
                  style={{
                    width: size + 14,
                    height: size + 14,
                    animationDelay: `${index * 0.22}s`,
                    background:
                      "radial-gradient(circle, rgba(255,236,200,0.35) 0%, transparent 70%)",
                    borderRadius: "50%",
                  }}
                />
              )}
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 m-auto"
                width={size + 6}
                height={size + 6}
                aria-hidden
                style={{
                  filter: isOpen
                    ? "drop-shadow(0 0 10px rgba(255,230,180,0.95)) drop-shadow(0 0 22px rgba(255,200,140,0.55))"
                    : "drop-shadow(0 0 6px rgba(255,240,210,0.7))",
                }}
              >
                <defs>
                  <radialGradient id={`star-fill-${star.id}`} cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#fffdf6" />
                    <stop offset="55%" stopColor="#f3e0b0" />
                    <stop offset="100%" stopColor="#e8c882" />
                  </radialGradient>
                </defs>
                <path
                  fill={`url(#star-fill-${star.id})`}
                  d="M12 1.5 L13.6 9.1 L21 10.5 L13.6 11.9 L12 22.5 L10.4 11.9 L3 10.5 L10.4 9.1 Z"
                />
                <path
                  fill={`url(#star-fill-${star.id})`}
                  d="M12 5.2 L16.8 10.5 L12 15.8 L7.2 10.5 Z"
                  opacity="0.55"
                />
              </svg>
            </motion.button>
          );
        })}

        <AnimatePresence>
          {constellation && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduce ? 0 : 1.7, duration: 0.95 }}
            >
              <div className="text-center">
                <p className="font-script text-[clamp(2.8rem,12vw,4.1rem)] leading-none text-[#f3e6c8]">
                  {album.names.him[0]}&{album.names.her[0]}
                </p>
                <p className="mt-3 font-serif text-[0.72rem] tracking-[0.32em] text-[#e4d2ae]/75 uppercase">
                  {meta.constellation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-4">
          {!constellation && (
            <button
              type="button"
              onClick={() => setConstellation(true)}
              disabled={!allOpened}
              className={`rounded-full border px-5 py-2.5 font-serif text-[0.72rem] tracking-[0.22em] uppercase backdrop-blur-md transition ${
                allOpened
                  ? "border-[#d7bc86]/60 bg-[#1a1420]/75 text-[#f3e6c8]"
                  : "border-white/10 bg-black/25 text-white/35"
              }`}
            >
              {allOpened
                ? meta.connect
                : `${opened.size}/${nightSkyStars.length} stars found`}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:items-center sm:pb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeStar}
          >
            <motion.article
              className="relative w-full max-w-sm overflow-hidden rounded-[4px] bg-[#f7f1e8] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e6d5cc]">
                <Image
                  src={active.image}
                  alt={active.memory}
                  fill
                  sizes="(max-width: 768px) 90vw, 380px"
                  quality={90}
                  className="object-cover"
                />
              </div>
              <div className="px-2 pt-4 pb-2 text-center">
                <p className="font-serif text-[0.68rem] tracking-[0.22em] text-burgundy/60 uppercase">
                  {active.date}
                </p>
                <p className="mt-2 font-hand text-[1.55rem] leading-snug text-ink">
                  {active.memory}
                </p>
                <button
                  type="button"
                  onClick={closeStar}
                  className="mt-4 inline-flex items-center gap-2 font-serif text-[0.7rem] tracking-[0.24em] text-burgundy/70 uppercase"
                >
                  back to the sky
                  <Heart className="h-3 w-3" />
                </button>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function makeBackgroundStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `bg-${i}`,
    x: (i * 47) % 100,
    y: (i * 31 + 13) % 100,
    size: 1 + (i % 3) * 0.6,
    opacity: 0.22 + (i % 5) * 0.1,
    duration: 2.5 + (i % 4),
    delay: (i % 7) * 0.35,
  }));
}
