"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  chapterMeta,
  secretLetters,
  type SecretLetter,
} from "@/data/album";
import { ChapterHeading, Heart } from "../scrapbook";

const TILTS = [-2.2, 1.8, -1.4, 2.4];

export function SecretLetters() {
  const meta = chapterMeta.letters;

  return (
    <section className="paper-warm overflow-x-clip">
      <ChapterHeading
        number={meta.number}
        title={meta.title}
        intro={meta.intro}
        hint={meta.hint}
      />
      <div className="mx-auto flex max-w-lg flex-col gap-10 px-5 pb-24">
        {secretLetters.map((letter, index) => (
          <Envelope key={letter.id} letter={letter} index={index} />
        ))}
      </div>
    </section>
  );
}

function Envelope({
  letter,
  index,
}: {
  letter: SecretLetter;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const tilt = TILTS[index % TILTS.length];

  return (
    <motion.div
      className={`relative mx-auto w-full max-w-[22rem] ${
        index % 2 === 0 ? "mr-auto" : "ml-auto"
      }`}
      style={{ rotate: open ? 0 : tilt }}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="group relative block w-full text-left"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -top-2 left-1/2 z-20 h-[1.2rem] w-16 -translate-x-1/2 -rotate-2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(184,149,106,0.35) 0 6px, rgba(243,232,208,0.88) 6px 12px)",
          }}
        />

        <div
          className="relative overflow-hidden rounded-[2px] lift"
          style={{
            background:
              "linear-gradient(160deg, #f4ebe0 0%, #eadccd 55%, #e2d2c0 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(rgba(90,58,48,0.05) 0.5px, transparent 0.5px)",
              backgroundSize: "4px 4px",
            }}
          />

          {/* flap */}
          <motion.div
            className="relative z-10 origin-top"
            initial={false}
            animate={{
              rotateX: open ? -168 : 0,
            }}
            transition={{ duration: reduce ? 0.01 : 0.55, ease: [0.7, 0.02, 0.25, 1] }}
            style={{
              transformStyle: "preserve-3d",
              perspective: 800,
            }}
          >
            <div
              className="h-16 w-full"
              style={{
                background:
                  "linear-gradient(180deg, #efe4d6 0%, #e4d5c4 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                boxShadow: open ? "none" : "0 8px 16px rgba(60,30,30,0.08)",
              }}
            />
            {!open && (
              <span className="absolute top-[2.35rem] left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-burgundy text-[#f6efe8] shadow-[0_4px_12px_rgba(60,30,30,0.2)]">
                <Heart className="h-4 w-4" />
              </span>
            )}
          </motion.div>

          <div className="relative -mt-8 px-5 pt-10 pb-5">
            <p className="pr-2 font-hand text-[1.65rem] leading-tight text-ink">
              {letter.seal}
            </p>
            <p className="mt-2 font-serif text-[0.68rem] tracking-[0.28em] text-burgundy/55 uppercase">
              {open ? "tap to close" : "sealed — tap to open"}
            </p>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="letter"
            initial={
              reduce
                ? { opacity: 1 }
                : { opacity: 0, y: -12, height: 0 }
            }
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="relative mx-3 -mt-1 bg-[#fbf7f0] px-5 py-5 lift ring-1 ring-[#e8dccb]">
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#c4a574]/50 to-transparent"
              />
            <p className="font-serif text-[0.68rem] tracking-[0.24em] text-burgundy/50 uppercase">
              for Sathu
            </p>
            <p className="mt-3 font-serif text-lg leading-relaxed text-ink/90 italic">
              {letter.letter}
            </p>
            <p className="mt-5 text-right font-hand text-[1.45rem] text-burgundy">
              — Ezhil
            </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
