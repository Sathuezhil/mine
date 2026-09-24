"use client";

import { useEffect, useMemo, useState } from "react";
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
  { x: 50, y: 78 },
  { x: 32, y: 60 },
  { x: 22, y: 40 },
  { x: 32, y: 26 },
  { x: 50, y: 38 },
  { x: 68, y: 26 },
  { x: 78, y: 40 },
  { x: 68, y: 60 },
];

const HEART_PATH =
  "M50 80 C24 60 16 38 30 24 C40 16 48 22 50 36 C52 22 60 16 70 24 C84 38 76 60 50 80 Z";

export function NightSky() {
  const meta = chapterMeta.sky;
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<NightSkyStar | null>(null);
  const [constellation, setConstellation] = useState(false);

  const allOpened = opened.size >= nightSkyStars.length;
  const bgStars = useMemo(() => makeBackgroundStars(40), []);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

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

      <header className="relative z-10 mx-auto max-w-lg px-5 pt-16 pb-4 text-center sm:px-6 sm:pt-20 sm:pb-6">
        <p className="font-serif text-[0.65rem] tracking-[0.36em] text-[#d7bc86]/70 uppercase sm:text-[0.68rem] sm:tracking-[0.42em]">
          Chapter {meta.number}
        </p>
        <h2 className="mt-3 font-hand text-[clamp(2.15rem,9.5vw,3.35rem)] leading-[1.05] font-medium text-[#f3e6c8]">
          {meta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-[17rem] font-serif text-[1.05rem] leading-snug text-[#e4d2ae]/80 italic sm:mt-5 sm:max-w-[18rem] sm:text-xl">
          {meta.intro}
        </p>
      </header>

      {/* Sky stage — tall enough to tap, not taller than the phone */}
      <div className="relative mx-auto w-full max-w-3xl px-2 sm:px-3">
        <div
          className="relative w-full overflow-hidden rounded-[1.25rem] sm:rounded-[1.5rem]"
          style={{
            height: "min(72dvh, 560px)",
            minHeight: "380px",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 8%, rgba(90,70,130,0.32), transparent 55%), radial-gradient(ellipse at 78% 82%, rgba(130,45,70,0.2), transparent 48%), linear-gradient(180deg, #0b0a14 0%, #130e1c 52%, #09080f 100%)",
            }}
          />

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
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

          {/* Keep star field inset so taps aren't clipped on phone edges */}
          <div className="absolute inset-[8%_6%_14%_6%] sm:inset-[7%_8%_12%_8%]">
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
                    strokeWidth="0.55"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: reduce ? 0.25 : 2.4,
                      ease: "easeInOut",
                    }}
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
                      stroke="rgba(232,210,170,0.4)"
                      strokeWidth="0.35"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.55 }}
                    />
                  );
                })}
            </svg>

            {nightSkyStars.map((star, index) => {
              const isOpen = opened.has(star.id);
              const heart = HEART_POINTS[index % HEART_POINTS.length];
              const x = constellation ? heart.x : star.x;
              const y = constellation ? heart.y : star.y;
              const visual = Math.round(18 + (star.size ?? 1) * 8);

              return (
                <motion.button
                  key={star.id}
                  type="button"
                  aria-label={`Open memory: ${star.date}`}
                  onClick={() => !constellation && openStar(star)}
                  className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center touch-manipulation"
                  initial={false}
                  animate={{ left: `${x}%`, top: `${y}%` }}
                  transition={{
                    duration: reduce ? 0.2 : 1.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: constellation ? index * 0.05 : 0,
                  }}
                  whileTap={constellation ? undefined : { scale: 0.9 }}
                  style={{
                    width: 48,
                    height: 48,
                    minWidth: 48,
                    minHeight: 48,
                  }}
                >
                  {!reduce && (
                    <span
                      className="sky-pulse pointer-events-none absolute inset-0 m-auto"
                      style={{
                        width: visual + 16,
                        height: visual + 16,
                        animationDelay: `${index * 0.22}s`,
                        background:
                          "radial-gradient(circle, rgba(255,236,200,0.32) 0%, transparent 70%)",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  <svg
                    viewBox="0 0 24 24"
                    width={visual}
                    height={visual}
                    aria-hidden
                    className="relative"
                    style={{
                      filter: isOpen
                        ? "drop-shadow(0 0 10px rgba(255,230,180,0.95)) drop-shadow(0 0 20px rgba(255,200,140,0.5))"
                        : "drop-shadow(0 0 6px rgba(255,240,210,0.75))",
                    }}
                  >
                    <defs>
                      <radialGradient
                        id={`star-fill-${star.id}`}
                        cx="50%"
                        cy="45%"
                        r="55%"
                      >
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
                  className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: reduce ? 0 : 1.7, duration: 0.95 }}
                >
                  <div className="text-center">
                    <p className="font-script text-[clamp(2.4rem,11vw,4.1rem)] leading-none text-[#f3e6c8]">
                      {album.names.him[0]}&{album.names.her[0]}
                    </p>
                    <p className="mt-2 font-serif text-[0.65rem] tracking-[0.28em] text-[#e4d2ae]/75 uppercase sm:mt-3 sm:text-[0.72rem] sm:tracking-[0.32em]">
                      {meta.constellation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center px-3 sm:bottom-5 sm:px-4">
            {!constellation && (
              <button
                type="button"
                onClick={() => setConstellation(true)}
                disabled={!allOpened}
                className={`max-w-[92%] rounded-full border px-4 py-2.5 text-center font-serif text-[0.62rem] leading-snug tracking-[0.16em] uppercase backdrop-blur-md transition sm:px-5 sm:text-[0.72rem] sm:tracking-[0.22em] ${
                  allOpened
                    ? "border-[#d7bc86]/60 bg-[#1a1420]/80 text-[#f3e6c8]"
                    : "border-white/10 bg-black/30 text-white/40"
                }`}
              >
                {allOpened
                  ? meta.connect
                  : `${opened.size}/${nightSkyStars.length} stars found`}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="h-10 sm:h-16" />

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:px-4 sm:pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeStar}
          >
            <motion.article
              className="relative flex max-h-[min(88dvh,640px)] w-full max-w-[22rem] flex-col overflow-hidden rounded-[4px] bg-[#f7f1e8] p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.5)] sm:max-w-sm sm:p-3"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="relative w-full min-h-0 shrink overflow-hidden bg-[#e6d5cc]"
                style={{
                  aspectRatio: "4 / 5",
                  maxHeight: "min(52dvh, 420px)",
                }}
              >
                <Image
                  src={active.image}
                  alt={active.memory}
                  fill
                  sizes="(max-width: 768px) 92vw, 380px"
                  quality={90}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="shrink-0 px-2 pt-3 pb-1.5 text-center sm:pt-4 sm:pb-2">
                <p className="font-serif text-[0.62rem] tracking-[0.2em] text-burgundy/60 uppercase sm:text-[0.68rem] sm:tracking-[0.22em]">
                  {active.date}
                </p>
                <p className="mt-1.5 font-hand text-[clamp(1.25rem,5.2vw,1.55rem)] leading-snug text-ink sm:mt-2">
                  {active.memory}
                </p>
                <button
                  type="button"
                  onClick={closeStar}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 px-2 font-serif text-[0.65rem] tracking-[0.2em] text-burgundy/70 uppercase sm:mt-4 sm:text-[0.7rem] sm:tracking-[0.24em]"
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
