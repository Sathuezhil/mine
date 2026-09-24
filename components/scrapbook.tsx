"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Frame, Memory } from "@/data/album";

const EASE = [0.22, 1, 0.36, 1] as const;

const ASPECT: Record<Frame, string> = {
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[5/4]",
};

const TILTS = [-2.4, 2.1, -1.5, 2.8, -2.8, 1.4];

export function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 20.2s-6.6-4.1-6.6-8.6C5.4 8.8 7.1 7.2 9.2 7.2c1.2 0 2.2.6 2.8 1.5.6-.9 1.6-1.5 2.8-1.5 2.1 0 3.8 1.6 3.8 4.4 0 4.5-6.6 8.6-6.6 8.6z" />
    </svg>
  );
}

export function ChapterHeading({
  number,
  title,
  intro,
  hint,
  first = false,
  tone = "serif",
}: {
  number: string;
  title: string;
  intro?: string;
  hint?: string;
  first?: boolean;
  tone?: "serif" | "hand";
}) {
  return (
    <header
      className={`mx-auto max-w-lg px-6 pb-8 text-center ${
        first
          ? "pt-[max(4.5rem,calc(env(safe-area-inset-top)+2.5rem))]"
          : "pt-20"
      }`}
    >
      <p className="font-serif text-[0.68rem] tracking-[0.42em] text-burgundy/70 uppercase">
        Chapter {number}
      </p>
      <h2 className="mt-3 text-balance font-hand text-[clamp(2.45rem,10vw,3.35rem)] leading-[1.02] font-medium text-ink">
        {title}
      </h2>
      {intro && tone === "serif" && (
        <p className="mx-auto mt-5 max-w-[18rem] font-serif text-xl leading-snug text-burgundy/80 italic">
          {intro}
        </p>
      )}
      {hint && (
        <p className="mt-4 font-serif text-[0.68rem] tracking-[0.32em] text-burgundy/50 uppercase">
          {hint}
        </p>
      )}
    </header>
  );
}

function altFor(memory: Memory) {
  return memory.caption || memory.memory || memory.note || "A photograph from our story";
}

export function Polaroid({
  memory,
  index = 0,
  className = "",
  priority = false,
  tape = "left",
  immediate = false,
  playful = false,
}: {
  memory: Memory;
  index?: number;
  className?: string;
  priority?: boolean;
  tape?: "left" | "right";
  immediate?: boolean;
  playful?: boolean;
}) {
  const reduce = useReducedMotion();
  if (!memory.image) return null;

  const base = memory.tilt ?? TILTS[index % TILTS.length];
  const tilt = playful ? base * 1.15 : base;
  const frame = memory.frame ?? "portrait";
  const hidden =
    immediate || reduce
      ? { opacity: 1, y: 0, rotate: tilt }
      : { opacity: 0, y: 28, rotate: tilt };

  return (
    <motion.figure
      className={`relative bg-[#f7f3ec] px-3 pt-3 pb-4 lift ${className}`}
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
      whileHover={reduce ? undefined : { y: -8, rotate: tilt * 0.25 }}
      whileTap={{ scale: 0.985 }}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-2.5 h-[1.35rem] w-16 ${
          tape === "right" ? "right-7 rotate-6" : "left-6 -rotate-6"
        }`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(184,149,106,0.32) 0 7px, rgba(243,232,208,0.82) 7px 14px)",
        }}
      />
      {playful && (
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-2 left-8 h-4 w-12 -rotate-12 bg-[#f4efe6]/80"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(201,165,155,0.35) 0 5px, rgba(247,241,234,0.7) 5px 10px)",
          }}
        />
      )}
      <div className={`relative overflow-hidden bg-[#e6d5cc] ${ASPECT[frame]}`}>
        <Image
          src={memory.image}
          alt={altFor(memory)}
          fill
          sizes="(max-width: 768px) 92vw, 720px"
          quality={95}
          priority={priority}
          className="object-cover"
        />
        <div className="photo-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_36px_rgba(40,20,20,0.16)]" />
      </div>
      <figcaption className="flex min-h-[4.5rem] flex-col items-center justify-center px-2 pt-4 pb-2 text-center">
        {memory.caption && (
          <p className="font-hand text-[1.45rem] leading-snug text-ink">{memory.caption}</p>
        )}
        {memory.note && (
          <p className="mt-1.5 max-w-[16rem] font-serif text-[0.95rem] leading-snug text-burgundy/70 italic">
            {memory.note}
          </p>
        )}
      </figcaption>
    </motion.figure>
  );
}

export function ScrapNote({
  text,
  index = 0,
  featured = false,
  className = "",
}: {
  text: string;
  index?: number;
  featured?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const tilt = featured ? -1.2 : [-1.8, 2, -2.2, 1.3][index % 4];

  return (
    <motion.blockquote
      className={`relative bg-[#f8f1e4] px-5 py-4 lift ${
        featured
          ? "mx-auto max-w-[19.5rem] font-hand text-[1.7rem] leading-snug"
          : "max-w-[15rem] font-hand text-[1.4rem] leading-snug"
      } rounded-[2px_12px_3px_10px] text-burgundy ${className}`}
      style={{ rotate: tilt }}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 -rotate-2 bg-[#e7dcc4]/85"
      />
      {text}
    </motion.blockquote>
  );
}

export function FramedPhoto({
  memory,
  className = "",
  priority = false,
}: {
  memory: Memory;
  className?: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  if (!memory.image) return null;
  const frame = memory.frame ?? "portrait";
  const tilt = memory.tilt ?? 0;

  return (
    <motion.figure
      className={`bg-[#fbf8f3] p-2 lift ring-1 ring-white/80 ${className}`}
      style={{ rotate: tilt }}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <div className="bg-[#f3ece4] p-3 sm:p-5">
        <div className="border border-[#c4a574]/45 p-[3px]">
          <div className={`relative overflow-hidden bg-[#e6d5cc] ${ASPECT[frame]}`}>
            <Image
              src={memory.image}
              alt={altFor(memory)}
              fill
              sizes="(max-width: 768px) 94vw, 900px"
              quality={95}
              priority={priority}
              className="object-cover"
            />
            <div className="photo-grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
          </div>
        </div>
        {(memory.caption || memory.note) && (
          <figcaption className="px-2 pt-4 pb-1 text-center">
            {memory.caption && (
              <p className="font-hand text-[1.65rem] leading-tight text-ink">{memory.caption}</p>
            )}
            {memory.note && (
              <p className="mt-1.5 font-serif text-[0.95rem] leading-snug text-burgundy/70 italic">
                {memory.note}
              </p>
            )}
          </figcaption>
        )}
      </div>
    </motion.figure>
  );
}
